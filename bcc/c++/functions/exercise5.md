### 5 - Implement a function in C++ called ehPrimo that checks whether an integer passed as a parameter is prime or not, returning true if it is prime and false otherwise.

---

```cpp
#include <iostream>
using namespace std;

bool ehPrimo (int x){
    int counter = 0;
    for (int i = 1; i <= x; i++){
        if (x % i == 0)
            counter++;
    }
    if (counter == 2)
        return true;
    else
        return false;
}
  
int main() {
    int num1;
    bool isPrime;
    
    cin >> num1;
    isPrime = ehPrimo(num1);
    
    cout << isPrime << endl;
}
