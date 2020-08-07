import shortid from 'shortid';
import getRandomNumber from './getRandomNumber';

const boardMap = (() => {
    'use strict';

    const maxItemSize = 60;
    let _boardWidth = 0;
    let _boardHeight = 0;
    let _itemSize = 0;
    let _items = [];

    const _distance = (rect1, rect2) => {
        const xd = rect2.x - rect1.x;
        const yd = rect2.y - rect1.y;
        return Math.sqrt((xd * xd) + (yd * yd));
    };

    const _isOverlapping = item => {
        const rect1 = {
            x: item.left - item.size/2,
            y: item.top - item.size/2,
            width: item.size,
            height: item.size,
        };
        for(let prop of _items) {
            let {left, top, width, height} = prop.style;
            let rect2 = {
                x: left - width/2,
                y: top - height/2,
                width,
                height,
            }
            const dist = _distance(rect1, rect2);
            if(dist < item.size * 1.25) {
                return true;
            }
        };
        return false;
    };

    const _setItemProps = index => {
        const margin = 10;
        const minLeft = margin;
        const maxLeft = _boardWidth - _itemSize - margin;
        const minTop = margin;
        const maxTop = _boardHeight - _itemSize - margin;
        let left, top, iterations = 0;
        do {
            left = getRandomNumber(minLeft, maxLeft);
            top = getRandomNumber(minTop, maxTop);
            if(++iterations === 100000) {
                return null;
            }
        } while (_isOverlapping({top, left, size: _itemSize}));
        const id = shortid.generate();
        // console.log(id, 'iterations:', iterations);
        return {
            id,
            index,
            style: {
                width: _itemSize,
                height: _itemSize,
                left,
                top,
            }
        }
    };
    
    const init = (width, height, itemsNum) => {
        _boardWidth = width;
        _boardHeight = height;
        _itemSize = Math.min(
            Math.sqrt(width * height / itemsNum) / 1.75,
            maxItemSize
        );
        // console.log('item size:', _itemSize);
    };

    const getSize = () => ({
        width: _boardWidth,
        height: _boardHeight,
    });

    const addItem = index => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const item = _setItemProps(index);
                if(!item) {
                    reject('Area too small!');
                } else {
                    _items.push(item);
                    resolve(item);
                }
            }, getRandomNumber(50, 250));
        })
    };

    const removeItem = id => {
        _items = _items.filter(item => item.id !== id);
        return id;
    };

    return { init, addItem, removeItem, getSize };
    
})();

export default boardMap;
