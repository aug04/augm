(function () {
    var instance;
    const _top = 40;
    const _right = 40;
    const _left = 40;
    const _bottom = 40;
    const _heightSpacing = 10;
    const _duration = {
        slow: 300,
        _default: 200,
        fast: 100
    };
    const _color = {
        info: '#004085',
        success: '#07bc0c',
        warning: '#f2a51a',
        error: '#9d0b0b'
    };

    function getduration(duration) {
        if (isNaN(duration)) {
            if ('slow,fast'.indexOf(duration) === -1)
                duration = '_default';

            return _duration[duration];
        } else {
            return parseInt(duration);
        }
    }

    function moveUp(duration, elem, top, onDone) {
        var pos = parseInt(elem.offsetTop);
        const startTime = (new Date()).getTime();
        repaint({
            dom: elem,
            direction: 'top',
            duration: duration,
            startTime: startTime,
            startPos: pos,
            pos: pos,
            endPos: top,
            onDone: onDone
        });
    }

    function bottomMoveUp(duration, elem, bottom, onDone) {
        var pos = parseInt(elem.style.bottom.replace('px', ''));
        const startTime = (new Date()).getTime();
        repaint({
            dom: elem,
            direction: 'bottom',
            duration: duration,
            startTime: startTime,
            startPos: pos,
            pos: pos,
            endPos: pos + bottom,
            onDone: onDone
        });
    }

    function moveDown(duration, elem, bottom, onDone) {
        var pos = parseInt(elem.style.bottom.replace('px', ''));
        const startTime = (new Date()).getTime();
        scheduleRepaint({
            dom: elem,
            direction: 'bottom',
            duration: duration,
            startTime: startTime,
            startPos: pos,
            pos: pos,
            endPos: bottom,
            onDone: onDone
        });

        function _updatePosition(o) {
            let now = (new Date()).getTime();
            let msSinceStart = now - o.startTime;
            let percentageOfProgress = msSinceStart / o.duration;
            let newPos;
            let endPosition = o.startPos - o.endPos;
            newPos = o.startPos - (o.endPos * percentageOfProgress);
            o.dom.style[o.direction] = Math.max(newPos, endPosition) + 'px';

            if (newPos > endPosition) {
                scheduleRepaint(o);
            } else {
                if (o.onDone && typeof(o.onDone) === 'function') {
                    o.onDone.call(null);
                }
            }
        }

        function scheduleRepaint(o) {
            setTimeout(function () {
                _updatePosition(o);
            }, 0);
        }
    }

    function move(direction, duration, elem, onDone) {
        let startTime = (new Date()).getTime();
        let startPos;
        let pos;
        let endPos;

        switch (direction) {
        case 'left':
            startPos = parseInt(elem.style.left.replace('px', ''));
            pos = Math.abs(parseInt(elem.style.left.replace('px', '')));
            endPos = _left;
            break;
        case 'top':

            break;
        case 'right':
            startPos = parseInt(elem.style.right.replace('px', ''));
            pos = Math.abs(parseInt(elem.style.right.replace('px', '')));
            endPos = _right;
            break;
        case 'bottom':

            break;
        }

        repaint({
            dom: elem,
            direction: direction,
            duration: duration,
            startTime: startTime,
            startPos: startPos,
            pos: pos,
            endPos: endPos,
            onDone: onDone
        });
    }

    function back(direction, duration, elem, onDone) {
        let startTime = (new Date()).getTime();
        let startPos;
        let pos;
        let endPos;
        let distance;

        switch (direction) {
        case 'top':

            break;
        case 'left':
        case 'right':
            startPos = direction === 'right' ? parseInt(elem.style.right.replace('px', '')) : elem.offsetLeft;
            pos = direction === 'right' ? Math.abs(parseInt(elem.style.right.replace('px', ''))) : elem.offsetLeft;
            endPos = elem.offsetWidth;
            distance = pos + Math.abs(endPos);
            scheduleRepaint();

            function _updatePosition() {
                let now = (new Date()).getTime();
                let msSinceStart = now - startTime;
                let percentageOfProgress = msSinceStart / duration;
                let newPos = startPos - (distance * percentageOfProgress);
                elem.style[direction] = Math.min(newPos, endPos) + 'px';
                if (newPos > -endPos) {
                    scheduleRepaint();
                } else {
                    if (onDone && typeof(onDone) === 'function') {
                        onDone.call(null);
                    }
                }
            }

            function scheduleRepaint() {
                setTimeout(_updatePosition, 0);
            }
            break;
        case 'bottom':

            break;
        }
    }

    function updatePosition(o) {
        let now = (new Date()).getTime();
        let msSinceStart = now - o.startTime;
        let percentageOfProgress = msSinceStart / o.duration;
        let newPos;
        switch (o.direction) {
        case 'left':
            newPos = o.startPos + ((o.pos - o.endPos) * percentageOfProgress);
            o.dom.style[o.direction] = Math.min(newPos, o.endPos) + 'px';

            if (newPos < o.endPos) {
                repaint(o);
            } else {
                if (o.onDone && typeof(o.onDone) === 'function') {
                    o.onDone.call(null);
                }
            }
            break;
        case 'top':
            let endPosition = o.startPos - o.endPos;
            newPos = o.startPos - (o.endPos * percentageOfProgress);
            o.dom.style[o.direction] = Math.max(newPos, endPosition) + 'px';

            if (newPos > endPosition) {
                repaint(o);
            } else {
                if (o.onDone && typeof(o.onDone) === 'function') {
                    o.onDone.call(null);
                }
            }
            break;
        case 'right':
            newPos = o.startPos + ((o.pos - o.endPos) * percentageOfProgress);
            o.dom.style[o.direction] = Math.min(newPos, o.endPos) + 'px';

            if (newPos < o.endPos) {
                repaint(o);
            } else {
                if (o.onDone && typeof(o.onDone) === 'function') {
                    o.onDone.call(null);
                }
            }
            break;
        case 'bottom':
            newPos = o.startPos + ((o.endPos - o.startPos) * percentageOfProgress);
            o.dom.style[o.direction] = Math.min(newPos, o.endPos) + 'px';

            if (newPos < o.endPos) {
                repaint(o);
            } else {
                if (o.onDone && typeof(o.onDone) === 'function') {
                    o.onDone.call(null);
                }
            }
            break;
        }
    }

    function repaint(o) {
        setTimeout(function () {
            updatePosition(o);
        }, 0);
    }

    function createInstance() {
        var o = {
            holder: [],
            duration: _duration._default,
            message: '',
            type: 'info',
            background: null,
            direction: 'right',
            verticalAnchorPoint: 'top',
            sticky: false,
            style: null,
            ttl: 5000,
            setTTL: function (milliseconds) {
              if (!isNaN(milliseconds)) {
                this.ttl = milliseconds;
              }
              
              return this;
            },
            setDirection: function (d) {
                if (isNaN(d) || d < 0 || d > 4)
                    d = 2;

                if (d === 1) {
                    this.direction = 'left';
                    this.verticalAnchorPoint = 'top';
                } else if (d === 2) {
                    this.direction = 'right';
                    this.verticalAnchorPoint = 'top';
                } else if (d === 3) {
                    this.direction = 'right';
                    this.verticalAnchorPoint = 'bottom';
                } else {
                    this.direction = 'left';
                    this.verticalAnchorPoint = 'bottom';
                }

                return this;
            },
            setStyle: function (style) {
                this.style = style;
                return this;
            },
            setBackground: function (background) {
                this.background = background;
                return this;
            },
            setMessage: function (msg) {
                this.message = msg;
                return this;
            },
            setType: function (type) {
                this.type = type;
                return this;
            },
            setSticky: function (sticky) {
                this.sticky = sticky || false;
                return this;
            },
            reset: function () {
                this.message = '';
            },
            setDuration: function (duration) {
                if (duration) {
                    if (isNaN(duration) && 'slow,fast'.indexOf(duration) !== -1) {
                        this.duration = _duration[duration];
                    } else if (!isNaN(duration) && parseInt(duration)) {
                        this.duration = duration;
                    }
                }

                return this;
            },
            show: function () {
                let $this = this;
                let dom = document.createElement('div');
                let domContent = document.createElement('div');
                let domClose = document.createElement('span');
                let domClearfix = document.createElement('div');
                domClearfix.style = 'clear: both';

                domContent.innerHTML = this.message;
                domContent.style.padding = '20px';
                domContent.style.float = 'left';

                domClose.innerHTML = '&times;';
                domClose.title = 'Close';
                domClose.style = 'cursor: pointer; font-family: Tahoma; font-size: 16px; font-weight: bold;';
                domClose.style.padding = '10px';
                domClose.style.float = 'right';
                domClose.addEventListener('click', function () {
                    backAndDestroy(dom);
                });

                dom.appendChild(domContent);
                dom.appendChild(domClose);
                dom.appendChild(domClearfix);
                dom.style = 'font-family: Tahoma, Arial, Helvetica; font-size: 16px';
                dom.style.position = 'fixed';
                if (this.verticalAnchorPoint === 'top') {
                    dom.style.top = _top + 'px';
                } else if (this.verticalAnchorPoint === 'bottom') {
                    dom.style.bottom = _bottom + 'px';
                } else if (this.verticalAnchorPoint === 'center') {
                    // Ignored
                } else if (!isNaN(verticalAnchorPoint)) {
                    let topVal = Math.floor(this.verticalAnchorPoint);
                    dom.style.top = topVal + 'px';
                }

                if (this.direction === 'right') {
                    dom.style.right = _right + 'px';
                } else if (this.direction === 'left') {
                    dom.style.left = _left + 'px';
                }

                let bgColor = _color[this.type] ? _color[this.type] : _color.info;
                dom.style.background = this.background ? this.background : bgColor;
                dom.style.color = 'white';
                dom.style.visibility = 'hidden';
                if (this.style && typeof this.style === 'object') {
                    for (let key in this.style) {
                        dom.style.setProperty(key, this.style[key]);
                    }
                }

                document.body.append(dom);
                this.holder.push(dom); // add to holder list
                if (this.holder.length > 1) {
                    let topVal = _top;
                    for (let i = 0; i < this.holder.length - 1; i++) {
                        let d = this.holder[i];
                        topVal += d.offsetHeight + _heightSpacing;
                    }

                    if (this.verticalAnchorPoint === 'top') {
                        dom.style.top = topVal + 'px';
                    } else if (this.verticalAnchorPoint === 'bottom') {
                        let topVal = dom.offsetHeight + _heightSpacing;
                        for (let i = 0; i < $this.holder.length - 1; i++) {
                            let d = $this.holder[i];
                            if (d) {
                                if (Math.sign(topVal) >= 0) {
                                    bottomMoveUp(getduration(_duration.fast), d, topVal, null);
                                }
                            }
                        }

                        dom.style.bottom = _bottom + 'px';
                    } else if (this.verticalAnchorPoint === 'center') {
                        // Ignored
                    } else if (!isNaN(verticalAnchorPoint)) {
                        let topVal = Math.floor(this.verticalAnchorPoint);
                        dom.style.top = topVal + 'px';
                    }
                }
                if (this.direction === 'right') {
                    dom.style.right = -dom.offsetWidth + 'px';
                } else if (this.direction === 'left') {
                    dom.style.left = -dom.offsetWidth + 'px';
                }
                dom.style.visibility = 'visible';
                move(this.direction, getduration(this.duration), dom, null);
                if (!this.sticky) {
                    let timeout = !isNaN(this.ttl) ? this.ttl : 5000;
                    setTimeout(function () {
                        backAndDestroy(dom);
                    }, timeout);
                }

                function backAndDestroy(dom) {
                    $this.reset();
                    let invertDirection = $this.direction === 'right' ? 'left' : 'right';
                    back($this.direction, getduration($this.duration), dom, function () {
                        let index = $this.holder.indexOf(dom);
                        $this.holder.splice(index, 1);
                        const removedHeight = dom.offsetHeight + _heightSpacing;
                        dom.remove();

                        if ($this.verticalAnchorPoint === 'top') {
                            for (let i = index; i < $this.holder.length; i++) {
                                let d = $this.holder[i];
                                if (d) {
                                    moveUp(getduration(_duration.fast), d, removedHeight, null);
                                }
                            }
                        } else if ($this.verticalAnchorPoint === 'bottom') {
                            for (let i = index - 1; i >= 0; i--) {
                                let d = $this.holder[i];
                                if (d) {
                                    moveDown(getduration(_duration.fast), d, removedHeight, null);
                                }
                            }
                        }
                    });
                }

                this.reset();
                return this;
            }
        };

        return o;
    }

    var AUGM = {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }

            return instance;
        }
    };

    if (!window.AUGM) {
        window.AUGM = AUGM;
        window.$m = AUGM;
    }
})(window);
