{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [ pkgs.nodejs_24 ];

  shellHook = ''
	echo "Environnement prêt !"
	echo "Lance: npm install && npm run dev"
  '';
}