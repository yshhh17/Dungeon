#include <graphics.h>
#include <conio.h>
#include <stdio.h>
#include <math.h>

void drawLine(int x1, int y1, int x2, int y2) {
    int dx = abs(x2 - x1);
    int dy = abs(y2 - y1);
    int p = 2 * dy - dx;
    int x, y;

    if (x1 > x2) {
        x = x2;
        y = y2;
        x2 = x1;
    } else {
        x = x1;
        y = y1;
    }

    putpixel(x, y, WHITE);

    while (x < x2) {
        x++;
        if (p < 0) {
            p += 2 * dy;
        } else {
            y++;
            p += 2 * (dy - dx);
        }
        putpixel(x, y, WHITE);
    }
}

int main() {
    int gd = DETECT, gm;
    int x1, y1, x2, y2;

    printf("Enter x1 y1: ");
    scanf("%d %d", &x1, &y1);
    printf("Enter x2 y2: ");
    scanf("%d %d", &x2, &y2);

    initgraph(&gd, &gm, "");

    drawLine(x1, y1, x2, y2);

    getch();
    closegraph();
    return 0;
}