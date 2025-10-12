#include <graphics.h>
#include <conio.h>

int main() {
    int gd = DETECT, gm;
    initgraph(&gd, &gm, "C:\\TURBOC3\\BGI");  // Adjust path if needed

    // Coordinates for rectangle (car base)
    int left = 150, top = 200, right = 450, bottom = 300;
    rectangle(left, top, right, bottom);

    // Coordinates for trapezium (roof)
    int roofLeft = left + 50;   // shifted inside from left
    int roofRight = right - 50; // shifted inside from right
    int roofTop = top - 80;     // height of trapezium
    line(roofLeft, top, roofRight, top);       // lower side of trapezium
    line(roofLeft, top, left + 120, roofTop);  // left slant
    line(roofRight, top, right - 120, roofTop);// right slant
    line(left + 120, roofTop, right - 120, roofTop); // top side

    // Wheels (circles beneath rectangle)
    int radius = 40;
    circle(left + 80, bottom + radius, radius);   // left wheel
    circle(right - 80, bottom + radius, radius);  // right wheel

    getch();
    closegraph();
    return 0;
}
