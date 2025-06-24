### 1 - Escreva uma função em C++ chamada media que calcula a média de três números de ponto flutuante passados como parâmetros.

===========================================================================

#include <iostream>
using namespace std;

double mediaFunc(double x, double y, double z) {
  return ((x + y + z) / 3);
}

int main() {
  double x, y, z, media;
  cin >> x >> y >> z;
  media = mediaFunc(x,y,z);
  cout << media << endl;
  
  return 0;
}