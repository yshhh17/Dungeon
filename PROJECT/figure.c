#include <graphics.h>
#include <conio.h>

int main() {
    int gd = DETECT, gm;
    initgraph(&gd, &gm, "C:\\Turboc3\\BGI");

    rectangle(200, 300, 400, 400);

    line(200, 300, 300, 200);  
    line(300, 200, 400, 300);  
    line(200, 300, 400, 300); 

    rectangle(270, 330, 330, 400);

    circle(300, 310, 20);

    getch();
    closegraph();
    return 0;
}
