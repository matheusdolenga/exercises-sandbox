### 6 - Implement a function in C++ called power that calculates the power of an integer base raised to an integer exponent passed as parameters. It should be done using for

---

```cpp
#include <iostream>
using namespace std;

long long potencia (int x, int y){
    if (y == 0)
        return 1;
    else if (y == 1)
        return x;
    long long result = x;
    for (int i = 2; i <= y; i++){
        result *= x;
    }
    return result;
}
  
int main() {
    int base, exponent; 
    long long power;
    cin >> base >> exponent;
    
    power = potencia(base, exponent);
    cout << power << endl;
    
    return 0;
}
