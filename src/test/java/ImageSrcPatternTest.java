import org.junit.Assert;
import org.junit.Test;
import ru.pechat55.constructor.render.Constructor;

import java.util.regex.Matcher;

public class ImageSrcPatternTest {

    public static final String JSON = "{\"model\":\"typographic_canvas\",\"mode\":\"3d\",\"fills\":[],\"sides\":[{\"objects\":" +
            "[{\"angle\":0,\"flipX\":false,\"flipY\":false,\"filters\":[],\"height\":4000,\"left\":318.87," +
            "\"opacity\":1,\"scaleX\":0.26,\"scaleY\":0.26,\"shadow\":null," +
            "\"src\":\"https://xn--80aj0aafqej6a4c.xn--80asehdb/image/polaroid/media/2023/08//1692367900-405.jpg\"," +
            "\"top\":409.2,\"transformMatrix\":null,\"type\":\"image\",\"width\":3000,\"visible\":true," +
            "\"lockScalingX\":false,\"lockScalingY\":false,\"lockRotation\":false,\"lockMovementX\":false," +
            "\"lockMovementY\":false},{\"angle\":0,\"flipX\":false,\"flipY\":false,\"filters\":[],\"height\":1032," +
            "\"left\":297.2,\"opacity\":1,\"scaleX\":0.43,\"scaleY\":0.43,\"shadow\":null," +
            "\"src\":\"https://xn--80aj0aafqej6a4c.xn--80asehdb/image/polaroid/media/2023/08//1692382518-827.png\"," +
            "\"top\":144.63,\"transformMatrix\":null,\"type\":\"image\",\"width\":891,\"visible\":true," +
            "\"lockScalingX\":false,\"lockScalingY\":false,\"lockRotation\":false,\"lockMovementX\":false," +
            "\"lockMovementY\":false}],\"width\":600,\"height\":900,\"roundCorners\":null,\"productPicture\":\"\"," +
            "\"mask\":[]}]}://xn--80aj0aafqej6a4c.xn--80asehdb/image/polaroid/media/2023/08//1692367900-405.jpg\"," +
            "\"top\":409.2,\"transformMatrix\":null,\"type\":\"image\",\"width\":3000,\"visible\":true," +
            "\"lockScalingX\":false,\"lockScalingY\":false,\"lockRotation\":false,\"lockMovementX\":false," +
            "\"lockMovementY\":false}],\"width\":600,\"height\":900,\"roundCorners\":null,\"productPicture\":\"\"," +
            "\"mask\":[]}]}";

    @Test
    public void testJsonImageSrc() {
        Matcher matcher = Constructor.IMG_SRC_PATTERN.matcher(JSON);
        String[] urls = new String[2];
        String[] expectedUrls = new String[]{
                "https://xn--80aj0aafqej6a4c.xn--80asehdb/image/polaroid/media/2023/08//1692367900-405.jpg",
                "https://xn--80aj0aafqej6a4c.xn--80asehdb/image/polaroid/media/2023/08//1692382518-827.png",
        };
        int i = 0;
        while (matcher.find()) {
            String url = matcher.group();
            System.out.println(url);
            urls[i++] = url;
        }
        Assert.assertArrayEquals(expectedUrls, urls);
    }

}
