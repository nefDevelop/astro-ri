import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('File Operations & Makefile Safety', () => {
  let tempDir: string;

  beforeAll(() => {
    // Create a temporary workspace for testing destructive operations
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-ri-test-'));
    
    // Copy the Makefile to the temp directory
    const makefileContent = fs.readFileSync(path.resolve(process.cwd(), 'Makefile'), 'utf-8');
    fs.writeFileSync(path.join(tempDir, 'Makefile'), makefileContent);
  });

  afterAll(() => {
    // Clean up temp directory
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('make clean only deletes cache and build artifacts, preserving src and core files', () => {
    // Setup dummy directories and files
    const dirsToCreate = [
      'dist',
      '.astro',
      'node_modules/.vite',
      'node_modules/some-package',
      'src/pages',
      'public'
    ];
    
    for (const dir of dirsToCreate) {
      fs.mkdirSync(path.join(tempDir, dir), { recursive: true });
      fs.writeFileSync(path.join(tempDir, dir, 'dummy.txt'), 'content');
    }
    
    // Also create a critical root file
    fs.writeFileSync(path.join(tempDir, 'package.json'), '{}');

    // Run the clean command
    execSync('make clean', { cwd: tempDir });

    // Assert that build/cache directories were deleted
    expect(fs.existsSync(path.join(tempDir, 'dist'))).toBe(false);
    expect(fs.existsSync(path.join(tempDir, '.astro'))).toBe(false);
    expect(fs.existsSync(path.join(tempDir, 'node_modules/.vite'))).toBe(false);

    // Assert that source files and other node_modules were NOT deleted
    expect(fs.existsSync(path.join(tempDir, 'src/pages/dummy.txt'))).toBe(true);
    expect(fs.existsSync(path.join(tempDir, 'public/dummy.txt'))).toBe(true);
    expect(fs.existsSync(path.join(tempDir, 'package.json'))).toBe(true);
    expect(fs.existsSync(path.join(tempDir, 'node_modules/some-package/dummy.txt'))).toBe(true);
  });

  it('make clean-all also removes the entire node_modules directory safely', () => {
    // Setup
    fs.mkdirSync(path.join(tempDir, 'node_modules/another-package'), { recursive: true });
    fs.mkdirSync(path.join(tempDir, 'src'), { recursive: true });
    
    execSync('make clean-all', { cwd: tempDir });

    // Assert
    expect(fs.existsSync(path.join(tempDir, 'node_modules'))).toBe(false);
    expect(fs.existsSync(path.join(tempDir, 'src'))).toBe(true);
  });

  it('package.json build copy script securely handles missing files without crashing', () => {
    // The build script contains: cp -rn dist/pagefind/pagefind-ui.* public/pagefind/ 2>/dev/null; true
    // We test this isolated command.
    fs.mkdirSync(path.join(tempDir, 'dist/pagefind'), { recursive: true });
    fs.mkdirSync(path.join(tempDir, 'public/pagefind'), { recursive: true });
    fs.writeFileSync(path.join(tempDir, 'dist/pagefind/pagefind-ui.js'), 'script');
    
    const command = 'cp -rn dist/pagefind/pagefind-ui.* public/pagefind/ 2>/dev/null; true';
    execSync(command, { cwd: tempDir });

    // Verify copy succeeded
    expect(fs.existsSync(path.join(tempDir, 'public/pagefind/pagefind-ui.js'))).toBe(true);

    // Verify it doesn't crash if dist is completely missing (simulating a failed build)
    fs.rmSync(path.join(tempDir, 'dist'), { recursive: true, force: true });
    
    expect(() => {
      execSync(command, { cwd: tempDir });
    }).not.toThrow();
  });
});
