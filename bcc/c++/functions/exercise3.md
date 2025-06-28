### 3 - Implement a function in C++ called ehPar that checks whether an integer passed as a parameter is even or not, returning true if it is even and false otherwise.

---

```cpp
#include <iostream>
using namespace std;

bool ehPar (int x){
    if (x % 2 == 0)
        return true;
    else
        return false;
}
  
int main() {
    int num1;
    bool isEven;
    
    cin >> num1;
    isEven = ehPar(num1);
    
    cout << isEven << endl;
}
