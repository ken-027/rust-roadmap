ifeq ($(OS),Windows_NT)
SHELL := C:/Program Files/Git/bin/bash.exe
endif

.PHONY: help calculator progress-scanner test clippy fmt

help: ## list targets
	@grep -hE '^[a-zA-Z0-9_-]+:.*##' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-32s\033[0m %s\n", $$1, $$2}'

calculator: ## run calculator app (operator=+|-|*|/)
	cargo run -p calculator -- -o ${operator}

scan: ## run progress-scanner app
	cargo run -p progress-scanner

test: ## run tests for app (app=<name>)
	cargo test -p ${app}

clippy: ## run clippy for app (app=<name>)
	cargo clippy -p ${app}

fmt: ## check formatting for app (app=<name>)
	cargo fmt -p ${app} --check
