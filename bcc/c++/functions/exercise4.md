### 4 - Write a C++ function called factorial that calculates the factorial of an integer passed as a parameter.

---

```cpp
#include <iostream>
using namespace std;

long long fatorial (int x){
    if (x < 0)
        return 0;
    else if (x == 1 or x == 0)
        return 1;
    else{
        long long temp = x;
        for (int i = (x - 1); i > 1; i--){
            temp = x * i;
            x = temp;
        }
    }
    return x;
}
  
int main() {
    int num1; 
    long long numFatorial;
    cin >> num1;
    numFatorial = fatorial(num1);
    cout << numFatorial << endl;
}
