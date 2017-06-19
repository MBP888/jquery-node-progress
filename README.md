# jquery-node-progress

 ## 第一个参数为stepBar容器的id，必填，允许传入的值包括如下：
  * jQuery对象
  * javascript对象
  * DOM元素（可转化为ID的字符串，如 “stepBar” || “#stepBar”） 纠错：误把jQuery对象的“#”写成“.”也同样能识别出来，但是必须保证次参数能转化成元素ID
  ## 第二个参数为一个对象直接量，选填，包含如下的零个或多个
   
   |参数名|参数类型|说明|
   |:------|:------|:------|
   |step|string,number|目标进度  默认为1（第一步），选填|
   |change|boolean|设置插件是否可被操作，选填  默认false|
   |animation|boolean|设置插件是否采用动画形式（前提stepBar.change为true），选填  默认false|
   |speed|number|动画速度（前提，change和animation为true） 选填   默认1000ms|
   |stepEasingForward|string|从当前步数往前过渡动画（前提，change和animation为true） 选填  默认 "easeOutExpo"  更多参数请参照 jquery.easing.js|
   |stepEasingBackward|string|从当前步数往后过渡动画（前提，change和animation为true） 选填  默认 "easeOutElastic"  更多参数请参照 jquery.easing.js|
   |beforeChange|function|切换操作前的判断，返回false，则不切换|
   |afterChange|function|切换操作前的后的操作|