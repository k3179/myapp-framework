/*
 * show from right
 * 
 */
app.module.layer = $.extend({},app.module,{
    moduleType : 'layer',
    show : function(){
        this.showLayer(true);
    },
    hide : function(){
        this.hideLayer();
    },
    bind : function(){
        this.bindMove();
        this.bindCustom();
    },
    bindMove : function(){
        var self    =   this;
        var moved,moving,direction,touch_start_x,touch_start_y,touch_move_x,touch_move_y,touch;
        var dis_x,dis_y,start_time,end_time,dis_time;
        var $layer   =   this.$module;
        $layer.on({
            touchstart : function(e){
                // check no move
                if(
                    self.moving || 
                    self.disable_drag || 
                    $(e.target).is('.no-drag-layer') ||
                    $(e.target).parents('.no-drag-layer').length>0                        
                ){
                    moving  =   false;
                    return;
                }
                moving  =   true;
                moved   =   false;
                direction   =   0;    // 1: direction-x    2: direction-y
                touch = e.originalEvent.touches[0];
                touch_start_x   =   touch.clientX;
                touch_start_y   =   touch.clientY;
                start_time  =   app.tools.microtime();
            },
            touchmove : function(e){
                if(!moving) return;
                moved   =   true;
                touch = e.originalEvent.touches[0];
                touch_move_x   =   touch.clientX;
                touch_move_y   =   touch.clientY;
                dis_x   =   touch_start_x - touch_move_x;
                dis_y   =   touch_start_y - touch_move_y;
                if(!direction){
                    if(Math.abs(dis_x) < Math.abs(dis_y)){
                        direction   =   2;  // direction-y
                        moving  =   false;
                    }else{
                        direction   =   1;
                    }
                }
                if(!moving){
                    return;
                }
                if(dis_x>0){
                    dis_x   =   0;
                }
                dis_x   =   (-1) * dis_x;
                $layer.get(0).style.transition = '';
                $layer.get(0).style.webkitTransform = 'translate3d('+dis_x+'px,0,0)';
                return false;
            },
            touchend : function(){
                if(!moving || !moved) return;
                self.moving =   false;
                moved   =   false;
                moving  =   false;
                end_time    =   app.tools.microtime();
                dis_time    =   (end_time - start_time)/1000;
                // right speed enough
                if(dis_x>(app.device.width/5) && (dis_x / dis_time > (app.device.width * 2))){
                    self.hide();
                    return;
                }
                if(dis_x<=0) return;
                if(dis_x < (app.device.width * 0.5)){
                    self.showLayer();
                }else{
                    self.hide();
                }
            }
        });
    },
    _afterShow : function(){
        this.afterShow();
        app.moving   =   false;
    },
    _afterHide : function(){
        this.afterHide();
        app.moving   =   false;
    },
    bindCustom : function(){},  // abstract function
    showLayer : function(init_show){
        if(this.moving) return;
        this.$module.show();
        var $layer  =   this.$module;
        this.moving =   true;
        var self    =   this;
        
        // check no pos
        var move_time    =   200;
        var trans_time  =   (move_time / 1000) + 's';
        
        setTimeout(function(){
            app.moving   =   true;
            // move layer
            $layer.get(0).style.transition = '-webkit-transform '+trans_time+' ease-out';
            $layer.get(0).style.webkitTransform = 'translate3d(0,0,0)';
            $layer.on('webkitTransitionEnd',function(){
                $layer.get(0).style.transition = '';
                $layer.off('webkitTransitionEnd');
                self.moving =   false;
                app.moving   =   false;
                if(init_show){
                    self._afterShow();
                }
            });
        },50);
    },
    hideLayer : function(){
        if(this.moving) return;
        var self    =   this;
        this.moving =   true;
        app.moving   =   true;
        var $layer  =   this.$module;
        
        // check no pos
        var move_time    =   200;
        var trans_time  =   (move_time / 1000) + 's';
        
        // move menu
        $layer.get(0).style.transition = '-webkit-transform '+trans_time+' ease-out';
        $layer.get(0).style.webkitTransform = 'translate3d(100%,0,0)';
        
        $layer.on('webkitTransitionEnd',function(){
            $layer.get(0).style.transition = '';
            $layer.off('webkitTransitionEnd');
            self.$module.hide();
            self.moving =   false;
            app.moving   =   false;
            self._afterHide();
        });
    }
    
});