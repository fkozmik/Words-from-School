{ pkgs ? import <nixpkgs> {} }:

let
	nodejs25 = pkgs.nodejs.overrideAttrs rec {
		version = "25.9.0";
		src = pkgs.fetchurl {
		  url = "https://nodejs.org/dist/v${version}/node-v${version}.tar.xz";
		  hash = "sha256-j3ivPuVfsnhmi1+AHbWL0aOOoWExjrXOISjdvJzYE6o=";
		};
	};
in
	pkgs.mkShell {
	  buildInputs = [ nodejs25 ];

	  shellHook = ''
		echo "Environnement prêt !"
		echo "Lance: npm install && npm run dev"
	  '';
}