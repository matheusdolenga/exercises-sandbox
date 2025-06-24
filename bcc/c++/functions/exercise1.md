### 1 - Write a C++ function named `media` that calculates the average of three floating-point numbers passed as parameters.

---

```cpp
#include <iostream>
using namespace std;

double mediaFunc(double x, double y, double z) {
    return ((x + y + z) / 3);
}

int main() {
    double x, y, z, media;
    cin >> x >> y >> z;
    media = mediaFunc(x, y, z);
    cout << media << endl;

    return 0;
}
