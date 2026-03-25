{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs_24
  ];
  
  shellHook = ''
    echo "Environnement prêt pour Mission Spatiale !"
    echo "Dev :"
    echo "Lance: npm install && npm run dev"
  '';
}