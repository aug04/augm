# augm - Javascript object toastify
A pure Javascript object make toast message

### Documentation
Provided an object with name is `AUGM` and short name is `$m`. It is a singleton object easy to use.
Below are some methods can be easily to use, please read them for more detail.

##### Methods
`setMessage(message)` ***(required)*** set the message to show, **message** parameter is a string message.

`show()` ***(required)*** show the message, if this function is not called -> nothing happened.

`setType(type)` ***(option)*** set the message type in: **info**, **success**, **warning**, **error**, the **type** parameter is a string. If not set, default value is ***info***, with each type, the wrapper element background will be difference.

`setDuration(duration)` ***(option)*** set duration to show/hide message, the **duration** parameter is a string in **slow** or **fast** or a positive integer number that represent for milliseconds. If not set, default value is **400ms** (nice animation).

`setTTL(milliseconds)` ***(option)*** set time to live for message, default the message live for **5000ms** (**5s**) and automatically removed.

`setSticky(isSticky)` ***(option)*** set sticky the message, it will not automatically removed. The **isSticky** parameter must be boolean value. *If sticky is setted to **true**, `setTTL` function (if set) will be ignored.*

`setDirection(number)` ***(option)*** set the direction with a **number** parameter is in: **1** (Top - Left), **2** (Top -Right), **3** (Bottom - Right), **4** (Bottom - Left), default direction is ***2** (Top - Right)*.

`setStyle(style)` ***(option)*** set the HTML style for wrapper element, the **style** parameter is normal inline style HTML.

`setBackground(backgroundColor)` ***(option)*** set wrapper background color, the **backgroundColor** parameter is a HTML color code, *if this function called to set background => the `setType` function (if set) will be ignored*.

##### Usage
```javascript
// This is full example and summary explain, the option functions can be ignored.
AUGM.getInstance()
    .setMessage("The quick brown fox jumps over the lazy dog")
    .setType('success') // info (blue), success (green), warning (orange), error (red)
    .setDuration('slow') // slow, fast or number of milliseconds
    .setTTL(3000) // default the message live for 5000ms, if sticky is set to "true", this function will be ignored.
    .setSticky(true) // default value is "false" the message will shown forever, set to "true" the "setTTL" function will be ignored.
    .setDirection(1) // default value is "2", for more detail see description above please.
    .setBackground('#eaeaea') // set custom background for the wrapper element instead of: info, success, warning, error style
    .setStyle('border-radius: 4px; background: lightgreen;') // the wrapper element style can be changed by called this function.
    .show(); // show the message

// Simple way to show message
AUGM.getInstance()
    .setMessage("The quick brown fox jumps over the lazy dog")
    .show();
```

And here are some examples about direction

Direction ***1***  
![top-left](https://media.giphy.com/media/YlGVTCuGmpPTcuXB2z/giphy.gif)

Direction ***2***  
![top-right](https://media.giphy.com/media/W6A2yqGqCZSEURpvHy/giphy.gif)

Direction ***3***  
![bottom-right](https://media.giphy.com/media/IgiZU382uo9CH3khL8/giphy.gif)

Direction ***4***  
![bottom-left](https://media.giphy.com/media/iF1zHcjjLKZnlRcw1N/giphy.gif)

Coding anything I want to do.
