---
layout: post
title:  "使用退火算法快速计算较优解"
date:   2012-11-09 10:57:30
categories: esupermap
---

退火算法主要是解决NP完成问题需要便利所有解空间才能计算出最优解

```
// SA.cpp : 定义控制台应用程序的入口点。
//

#include "stdafx.h"
#include <math.h>
#include <stdlib.h>
#include <Windows.h>
int _tmain(int argc, _TCHAR* argv[])
{
    double Test[100000];
    int i=0;
    for (i=0;i<100000;i++)
    {
        Test[i] = rand() % 1000;
    }

    int nStart = GetTickCount();
    double nMax = 0;
    for (i=0;i<100000;i++)
    {
        if (nMax<Test[i])
        {
            nMax = Test[i];
        }
    }
    int nEnd = GetTickCount();
    // 遍历得到的最大值
    printf( "Max is %f, use %d\n", nMax ,nEnd-nStart);


    nStart = GetTickCount();
    double nCur = 0; //当前解
    double nNext = 0; //下一解
    double T = 10000; //初始温度
    double T_min = 0.0001; //最终温度
    double r = 0.9; //温度衰减率
    double dE = 0;  //
    i=0;
    while( T > T_min )
    {
        nNext = Test[i+1]; //获取下一个解
        dE = nNext - nCur ;  //解的差值

        if ( dE >= 0 )  //表达移动后得到更优解，则总是接受移动
            nCur = nNext ;  //接受从Y(i)到Y(i+1)的移动
        else
        {
        // 函数exp( dE/T )的取值范围是(0,1) ，dE/T越大，则exp( dE/T )也越大
            double sd = exp( (double)dE/T );
            double ran = (double)rand() / RAND_MAX; // 这里使用随机数表示已一定的概率接受
            if ( sd > ran)
                nCur = nNext ;  //接受从Y(i)到Y(i+1)的移动
        }
        T = r * T ;  //降温退火 ，0<r<1 。r越大，降温越慢；r越小，降温越快
        /*
　　  * 若r过大，则搜索到全局最优解的可能会较高，但搜索的过程也就较长。若r过小，则搜索的过程会很快，但最终可能会达到一个局部最优值
        */
        i ++ ;
        if (i==100000)
        {
            break;
        }
    }
    nEnd = GetTickCount();
    // 模拟退火得到的
    printf( "SA Max is %f, use %d\n", nCur,nEnd-nStart );
    return 0;
}
```

参考资料

大白话解析模拟退火算法

<http://www.cnblogs.com/heaad/archive/2010/12/20/1911614.html>

模拟退火算法

<http://baike.baidu.com/view/18185.htm>
