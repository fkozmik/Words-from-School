{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [ pkgs.nodejs_22 ];

  shellHook = ''
	echo "Environnement prêt !"
	echo "Lance: npm install && npm run dev"
  '';
}