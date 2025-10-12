#include <graphics.h>
#include <conio.h>
#include <stdio.h>

// Midpoint Circle Algorithm
void drawCircle(int xc, int yc, int r) {
    int x = 0, y = r;
    int d = 1 - r;

    while (x <= y) {
        // 8-way symmetry
        putpixel(xc + x, yc + y, WHITE);
        putpixel(xc - x, yc + y, WHITE);
        putpixel(xc + x, yc - y, WHITE);
        putpixel(xc - x, yc - y, WHITE);
        putpixel(xc + y, yc + x, WHITE);
        putpixel(xc - y, yc + x, WHITE);
        putpixel(xc + y, yc - x, WHITE);
        putpixel(xc - y, yc - x, WHITE);

        if (d < 0) {
            d += 2 * x + 3;
        } else {
            d += 2 * (x - y) + 5;
            y--;
        }
        x++;
    }
}

int main() {
    int gd = DETECT, gm;
    int xc, yc, r;

    printf("Enter center of circle (x y): ");
    scanf("%d %d", &xc, &yc);

    printf("Enter radius: ");
    scanf("%d", &r);

    initgraph(&gd, &gm, "C:\\Turboc3\\BGI");  // ✅ Important: Path to BGI folder

    drawCircle(xc, yc, r);

    getch();
    closegraph();
    return 0;
}
