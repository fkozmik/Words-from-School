{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs_20
  ];
  
  shellHook = ''
    echo "Environnement pr�t pour Mission Spatiale \U0001f680"
    echo "Lance: npm install && npm run dev"
  '';
}