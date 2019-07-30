(function() {
    this.OrderPriceUI = flight.component(function() {
        flight.compose.mixin(this, [OrderInputMixin]);
        this.attributes({
            precision: gon.market.bid.fixed,
            variables: {
                input: 'price',
                known: 'volume',
                output: 'total'
            }
        });
        this.getLastPrice = function() {
            return Number(gon.ticker.last);
        };
        this.toggleAlert = function(event) {
            var lastPrice;
            lastPrice = this.getLastPrice();
            switch (false) {
                case !!this.value:
                    return this.trigger('place_order::price_alert::hide');
                case !(this.value > (lastPrice * 1.1)):
                    return this.trigger('place_order::price_alert::show', {
                        label: 'price_high'
                    });
                case !(this.value < (lastPrice * 0.9)):
                    return this.trigger('place_order::price_alert::show', {
                        label: 'price_low'
                    });
                default:
                    return this.trigger('place_order::price_alert::hide');
            }
        };
        this.onOutput = function(event, order) {
            var price;
            price = order.total.div(order.volume);
            return this.$node.val(price);
        };
        return this.after('initialize', function() {
            return this.on('focusout', this.toggleAlert);
        });
    });

}).call(this);
