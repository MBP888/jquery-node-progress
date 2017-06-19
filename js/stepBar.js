var stepBar = {
    bar: {},
    item: {},
    barWidth: 0,
    itemCount: 2,
    itemWidth: 0,
    processWidth: 0,
    curProcessWidth: 0,
    step: 1,
    curStep: 0,
    triggerStep: 1,
    change: false,
    animation: false,
    speed: 1000,
    stepEasingForward: "easeOutCubic",
    stepEasingBackward: "easeOutElastic",
    beforeChange: function (curStep, nextStep) {
        return true;
    },
    afterChange: function (curStep) {
    },

    init: function (id, option) {
        if (typeof id == "object" || id.indexOf("#") == 0) {
            this.bar = $(id);
        } else {
            if (id.indexOf(".") == 0) {
                id = id.substring(1, id.length);
            }
            this.bar = $("#" + id);
        }
        this.change = option.change ? true : false;
        this.animation = this.change && option.animation ? true : false;
        this.layout();
        this.item = this.bar.find(".ui-stepInfo");
        if (this.item.length < 2) {
            return;
        }
        this.bar.show();
        this.itemCount = this.item.length;
        this.step = !isNaN(option.step) && option.step <= this.itemCount && option.step > 0 ? option.step : 1;
        this.triggerStep = this.step;
        if (!isNaN(option.speed) && option.speed > 0) {
            this.speed = parseInt(option.speed);
        }
        this.stepEasing(option.stepEasingForward, false);
        this.stepEasing(option.stepEasingBackward, true);
        this.stepInfoWidthFun();
    },
    stepEasing: function (stepEasing, backward) {
        if (typeof jQuery.easing[stepEasing] === "function") {
            if (backward) {
                this.stepEasingBackward = stepEasing;
            } else {
                this.stepEasingForward = stepEasing;
            }
        }
    },
    layout: function () {
        this.bar.find(".ui-stepInfo .ui-stepSequence").addClass("judge-stepSequence-hind");
        this.bar.find(".ui-stepInfo:first-child .ui-stepSequence").addClass("judge-stepSequence-pre");
    },
    classHover: function () {
        if (this.change) {
            this.bar.find(".ui-stepInfo .judge-stepSequence-pre").removeClass("judge-stepSequence-hind-change").addClass("judge-stepSequence-pre-change");
            this.bar.find(".ui-stepInfo .judge-stepSequence-hind").removeClass("judge-stepSequence-pre-change").addClass("judge-stepSequence-hind-change");
        }
    },
    stepInfoWidthFun: function () {
        if (this.itemCount > 0) {
            this.barWidth = this.bar.width();
            this.itemWidth = Math.floor((this.barWidth * 0.9) / (this.itemCount - 1));
            this.bar.find(".ui-stepLayout").width(Math.floor(this.barWidth * 0.9 + this.itemWidth));
            this.item.width(this.itemWidth);
            this.bar.find(".ui-stepLayout").css({"margin-left": -Math.floor(this.itemWidth / 2) + 10});
            if (this.change) {
                this._event();
            }
            this.percent();
        }
    },
    _event: function () {
        var _this = this;
        _this.bar.on("click", ".ui-stepSequence", function () {
            var triggerStep = $(this).text();
            if (!isNaN(parseInt(triggerStep)) && triggerStep > 0 && triggerStep <= _this.itemCount && triggerStep != _this.curStep) {
                if (_this.beforeChange(_this.triggerStep, triggerStep)) {
                    _this.triggerStep = triggerStep;
                    _this.percent();
                }
            }
        });
    },
    percent: function () {
        var _this = this;
        var calc = 100 / (_this.itemCount - 1);
        _this.processWidth = calc * (_this.triggerStep - 1) + "%";
        if (_this.animation) {
            if (_this.triggerStep < _this.curStep) {
                _this._animate();
                _this.curStep--;
            } else {
                _this.curStep++;
            }
            _this.curProcessWidth = calc * (_this.curStep - 1) + "%";
            _this.bar.find(".ui-stepProcess").stop(true).animate({"width": _this.curProcessWidth}, _this.speed, function () {
                _this._animate();
                if (_this.processWidth != _this.curProcessWidth) {
                    _this.percent();
                }
            });
        } else {
            if (_this.curProcessWidth != _this.processWidth) {
                _this.curProcessWidth = _this.processWidth;
                _this.bar.find(".ui-stepProcess").width(_this.processWidth);
                _this.jump();
            }
        }
        _this.afterChange(_this.triggerStep);
    },
    jump: function () {
        this.bar.find(".ui-stepInfo .ui-stepSequence").removeClass("judge-stepSequence-pre").addClass("judge-stepSequence-hind");
        this.bar.find(".ui-stepInfo:nth-child(-n+" + this.triggerStep + ") .ui-stepSequence").removeClass("judge-stepSequence-hind").addClass("judge-stepSequence-pre");
        this.classHover();
    },
    _animate: function () {
        var stepSequence_size = {},
            easing = this.stepEasingBackward,
            preClass,
            hindClass;

        if (this.triggerStep < this.curStep) {
            stepSequence_size.padding = "6px 10px";
            preClass = "judge-stepSequence-pre";
            hindClass = "judge-stepSequence-hind";
            easing = this.stepEasingForward;
        } else {
            stepSequence_size.padding = "8px 12px";
            preClass = "judge-stepSequence-hind";
            hindClass = "judge-stepSequence-pre";
        }
        this.bar.find(".ui-stepInfo:nth-child(" + this.curStep + ") .ui-stepSequence").removeClass(preClass).addClass(hindClass);
        this.bar.find(".ui-stepInfo:nth-child(" + this.curStep + ") .ui-stepSequence").animate(stepSequence_size, 500, easing);
        this.classHover();
    }
};