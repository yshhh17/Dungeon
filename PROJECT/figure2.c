#include <graphics.h>
#include <conio.h>

int main() {
    int gd = DETECT, gm;
    initgraph(&gd, &gm, "C:\\TURBOC3\\BGI"); 

    int left = 150, top = 200, right = 450, bottom = 300;
    rectangle(left, top, right, bottom);

    
    int roofLeft = left + 50;  
    int roofRight = right - 50; 
    int roofTop = top - 80;     
    line(roofLeft, top, roofRight, top);      
    line(roofLeft, top, left + 120, roofTop);  
    line(roofRight, top, right - 120, roofTop);
    line(left + 120, roofTop, right - 120, roofTop); 

    int radius = 40;
    circle(left + 80, bottom + radius, radius);   
    circle(right - 80, bottom + radius, radius);  
    getch();
    closegraph();
    return 0;
}
