.PHONY: dev build preview check typecheck lint format clean

# ─── Development ────────────────────────────────────────────

dev:
	npm run dev

dev-host:
	npm run dev -- --host

dev-debug:
	npm run dev -- --host --verbose

# ─── Build ──────────────────────────────────────────────────

build:
	npm run build

pagefind:
	pagefind --site dist && cp -rn dist/pagefind/pagefind-ui.* public/pagefind/ 2>/dev/null; true

preview:
	npm run preview

# ─── Code Quality ──────────────────────────────────────────

check:
	npx astro check

typecheck:
	npx tsc --noEmit

# ─── Dependencies ──────────────────────────────────────────

install:
	npm install

update:
	npm update

outdated:
	npm outdated

# ─── Cleanup ───────────────────────────────────────────────

clean:
	rm -rf dist/ .astro/ node_modules/.vite/

clean-all: clean
	rm -rf node_modules/

reinstall: clean-all install

# ─── Help ──────────────────────────────────────────────────

help:
	@echo "Usage: make <target>"
	@echo ""
	@echo "Development"
	@echo "  make dev          Start dev server"
	@echo "  make dev-host     Start dev server (network)"
	@echo "  make dev-debug    Start dev server (verbose)"
	@echo ""
	@echo "Build"
	@echo "  make build        Build for production"
	@echo "  make preview      Preview production build"
	@echo ""
	@echo "Code Quality"
	@echo "  make check        Run astro check"
	@echo "  make typecheck    Run tsc --noEmit"
	@echo ""
	@echo "Dependencies"
	@echo "  make install      Install dependencies"
	@echo "  make update       Update dependencies"
	@echo "  make outdated     List outdated packages"
	@echo ""
	@echo "Cleanup"
	@echo "  make clean        Remove build/cache artifacts"
	@echo "  make clean-all    Remove node_modules too"
	@echo "  make reinstall    Clean + reinstall"
