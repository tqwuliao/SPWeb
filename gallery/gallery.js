import header,{register} from '../header.js'
import { HtmlElement, createElement } from '../createHtml.js';

register( 'gallery',function() {
    $(".content-container").append(
        `<table>
        <tr>
          <th>姓名</th>
          <th>电话</th>
          <th>电话</th>
        </tr>
        <tr>
          <td>Bill Gates</td>
          <td>555 77 854</td>
          <td>555 77 855</td>
        </tr>
        </table>`
    );
} );

$(window).on("load", function() {
    header("gallery");

    window.myreload["gallery"]();
    
});