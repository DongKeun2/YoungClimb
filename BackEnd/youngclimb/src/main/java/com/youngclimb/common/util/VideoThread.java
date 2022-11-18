package com.youngclimb.common.util;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.jcodec.api.FrameGrab;
import org.jcodec.common.io.NIOUtils;
import org.jcodec.common.model.Picture;
import org.jcodec.scale.AWTUtil;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.InputStream;

@AllArgsConstructor
@RequiredArgsConstructor
public class VideoThread extends Thread {
    private int threadNo;
    private int threadSize;
    private double plusSize;
    private File source;

    public VideoThread(File source, int threadSize, int threadNo, double plusSize) {
        this.source = source;
        this.threadSize = threadSize;
        this.threadNo = threadNo;
        this.plusSize = plusSize;
    }

    public void run() {
        FrameGrab grab;

        try {
            grab = FrameGrab.createFrameGrab(NIOUtils.readableChannel(source));

            for(int m = 0; m < 120; m++) {
                if(m % threadSize == threadNo) {
                    double startSec = m * plusSize;
                    System.out.println(threadNo + " " + startSec);

                    int frameCount = 1;
                    grab.seekToSecondPrecise(startSec);

                    for (int i=0; i < frameCount; i++) {
                        Picture picture = grab.getNativeFrame();

                        //for JDK (jcodec-javase)
                        BufferedImage bufferedImage = AWTUtil.toBufferedImage(picture);
                        ByteArrayOutputStream os = new ByteArrayOutputStream();

                        ImageIO.write(bufferedImage, "png", os);
                        InputStream is = new ByteArrayInputStream(os.toByteArray());

                    }
                }
            }
        } catch (Exception e1) {
            e1.printStackTrace();
        }
    }
}
