.PHONY: build-local build-prod generate serve clean dev

build-local: generate
	go run ./cmd/generate/ --base-path /pro/

build-prod: generate
	go run ./cmd/generate/ --base-path /yerf/pro/

generate:
	templ generate

serve:
	cd ../pro && python3 -m http.server 8080

clean:
	rm -rf ../pro qa-contractor static-gen cmd/generate/static-gen

dev:
	go run . &
	sleep 1
	@echo "http://localhost:3000"
