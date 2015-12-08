# react-rotateImage


![Aaron Swartz](https://github.com/Luciahelloworld/react-rotateImage/raw/master/interface/public/sources/demo.gif)





前两天看见一个大神用html和js做了一个“旋转木马的demo”，所以我用react模仿他也做了了一个类似的demo，希望大家给出建议，做的更完美
图片一帧一帧的切换

这是一个网页的组件。 实现的功能是类似于旋转木马，图片一帧一帧的转动切换

你可以在通过设置组建的setting{

                              width:___, 
                              height:_, 
                              posterWidth:____, 
                              posterHeight:, 
                              scale:____, 
                              autoPlay:___, 
                              delay:_, 
                              verticalAlign:___  
                              }


width,height: 对应组件的整体整体的宽和高。默认为1000，270。

posterWidth,posterHeight: 中间的图片的宽度和高度。默认为640，270

scale:层级减少倍数。默认为0.9，

autoPlay:是否自动播放，当值设为"true",自动播放。默认为"false",

delay:当autoPlay为true，delay为刷新时间。默认为4000.

verticalAlign:层级分布效果.默认为"middle"



