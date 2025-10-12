#include <stdio.h>
#include <conio.h>
#include <graphics.h>
#include <stdlib.h> 

int x1_orig, y1_orig, x2_orig, y2_orig, depth_orig;

void draw_original() {
    bar3d(x1_orig, y1_orig, x2_orig, y2_orig, depth_orig, 1);
}

void perform_translation() {
    int tx, ty; 
    int x1_new, y1_new, x2_new, y2_new, depth_new;

    printf("\n\nEnter the Translation Distance along X-axis (Tx): ");
    scanf("%d", &tx);
    printf("Enter the Translation Distance along Y-axis (Ty): ");
    scanf("%d", &ty);

    x1_new = x1_orig + tx;
    y1_new = y1_orig + ty;
    x2_new = x2_orig + tx;
    y2_new = y2_orig + ty;

    depth_new = (x2_new - x1_new) / 4; 

    cleardevice();

    setcolor(YELLOW);
    draw_original();

    setcolor(GREEN);

    bar3d(x1_new, y1_new, x2_new, y2_new, depth_new, 1);

    printf("\n3D Translation complete. Press any key to exit.");
}

void main() {
    int gd = DETECT, gm;
    char path[] = "C:\\TurboC3\\BGI"; 

    initgraph(&gd, &gm, path);

    if (graphresult() != grOk) {
        printf("Graphics error: Unable to initialize graphics mode.\n");
        printf("Check the BGI path: %s\n", path);
        getch();
        exit(1);
    }

    printf("\n\t\t3D Translation Example (using bar3d)");
    printf("\n---------------------------------------------------------");

    printf("\nEnter 1st top-left corner values (x1, y1): ");
    scanf("%d %d", &x1_orig, &y1_orig);

    printf("Enter right-bottom corner values (x2, y2): ");
    scanf("%d %d", &x2_orig, &y2_orig);

    depth_orig = (x2_orig - x1_orig) / 4; 

    setcolor(WHITE);
    draw_original();
    printf("\nOriginal 3D object drawn. Press any key to continue...");
    getch();

    perform_translation();

    getch();
    closegraph(); 
}