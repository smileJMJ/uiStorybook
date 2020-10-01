import * as PIXI from 'pixi.js';

interface IGraphicData {
    type: 'lineCircle' | 'fillCircle' | 'fillRect';
    x: number;
    y: number;
    radius?: number;
    width?: number;
    height?: number;
    lineColor?: number;
    bgColor?: number;
    targetGrayCircleIdx?: number;
    defaultDegree?: number;
    time?: number;
    maxTime?: number;
    graphic?: PIXI.Graphics;
    direction?: 1 | -1;
}

class Visual {
    private _app: PIXI.Application;
    private _container: PIXI.Container;

    // app의 기본 설정
    defaultOption = {
        width: window.outerWidth,
        height: 530,
        //backgroundColor: 0xffffff, // bgColor 들어오면 resize 시 검은색 bg가 잠깐씩 보여서 transparent로 변경
        transparent: true,
        antialias: true,
        resizeTo: window
    };

    // 도형 데이터
    grayCircleData: IGraphicData[] = [{type: 'lineCircle', x: -783, y: 0, radius: 220, lineColor: 0xededed},
        {type: 'lineCircle', x: -402, y: 278, radius: 138, lineColor: 0xededed},
        {type: 'lineCircle', x: 541, y: 235, radius: 284, lineColor: 0xededed},
        {type: 'lineCircle', x: 905, y: 198, radius: 154, lineColor: 0xededed}];

    motionGraphicData: IGraphicData[] = [{type: 'fillCircle', x: -1240, y: 212, radius: 5, bgColor: 0x632dfe, targetGrayCircleIdx: 0, time: 0.003},   /* 좌측부터 순서임. 보라색 원 */
        {type: 'fillCircle', x: -536, y: 304, radius: 5, bgColor: 0xfa6956, targetGrayCircleIdx: 1, time: 0.005},    /* 빨간 원 */
        {type: 'fillCircle', x: -116, y: 23, radius: 5, bgColor: 0x706dff, direction: 1, time: 0.15, maxTime: 5},     /* 중간 보라색 원 */
        {type: 'fillCircle', x: 176, y: 399, radius: 5, bgColor: 0x5bc599, direction: -1, time: 0.1, maxTime: 5},     /* 중간 녹색 원 */
        {type: 'fillCircle', x: 789, y: 96, radius: 5, bgColor: 0x4558f6, targetGrayCircleIdx: 2, time: -0.001},    /* 파란색 원 */
        {type: 'fillCircle', x: 839, y: 336, radius: 5, bgColor: 0x5bc599, targetGrayCircleIdx: 3, time: -0.005},    /* 초록색 원 */
        {type: 'fillCircle', x: 779, y: 476, radius: 5, bgColor: 0x706dff, direction: 1, time: 0.15, maxTime: 6},     /* 보라색 원 */
        {type: 'fillRect', x: -740, y: 387, width: 10, height: 10, bgColor: 0x54a6f7, direction: -1, time: 0.15, maxTime: 6},    /* 하늘색 사각형 */
        {type: 'fillRect', x: -585, y: 88, width: 10, height: 10, bgColor: 0xff9000, targetGrayCircleIdx: 0, time: -0.002},    /* 노란색 사각형 */
        {type: 'fillRect', x: -138, y: 432, width: 10, height: 10, bgColor: 0xff9000, direction: 1, time: 0.1, maxTime: 6},    /* 귤 사각형 */
        {type: 'fillRect', x: 302, y: 68, width: 10, height: 10, bgColor: 0x54a6f7, targetGrayCircleIdx: 2, time: 0.002},     /* 파란색 사각형 */
        {type: 'fillRect', x: 537, y: 290, width: 10, height: 10, bgColor: 0xea735e, direction: -1, time: 0.15, maxTime: 6}];  /* 다홍색 사각형 */

    // 초기화
    init(ele: HTMLElement) {
        if(!ele) return;

        this._app = new PIXI.Application(this.defaultOption);

        const container = new PIXI.Container();
        this._container = container;

        ele.appendChild(this._app.view);
        this._app.stage.addChild(this._container);
        this._app.stage.interactive = true;

        this.calcContainer();
        this.drawGrayCircle();
        this.drawGraphic();
        this.motion();

        window.onresize = () => {
            this.calcContainer();
        };
    }

    calcContainer() {
        this._container.x = this._app.screen.width / 2;
        this._container.y = 0;
    }

    drawGrayCircle() {
        const graphics = new PIXI.Graphics();

        this.grayCircleData.map((v, i) => {
            graphics.lineStyle(1, v.lineColor, 1);
            graphics.drawCircle(v.x, v.y, v.radius);
        });

        this._container.addChild(graphics);
    }

    drawGraphic() {
        const self = this;

        this.motionGraphicData.forEach((v, i) => {
            const graphics = new PIXI.Graphics();

            if(v.type === 'fillCircle') {
                graphics.lineStyle(0);
                graphics.beginFill(v.bgColor);
                graphics.drawCircle(0, 0, v.radius);
                graphics.endFill();
            } else {
                graphics.lineStyle(0);
                graphics.beginFill(v.bgColor);
                graphics.drawRect(0, 0, v.width, v.height);
                graphics.endFill();
                graphics.rotation = Math.PI / 4; // 사각형은 90도 돌려야하는데 radian으로 계산하여 (Math.Pi / 180 * 45)
            }

            if(v.targetGrayCircleIdx || v.targetGrayCircleIdx === 0) { // v.targetGrayCircleIdx만 조건 넣었을 때 값이 0인 경우는 false로 취급해서 조건에 추가함
                const targetGrayCircle = self.grayCircleData[v.targetGrayCircleIdx];
                v.defaultDegree = self.calcDefaultDegree(v.x, v.y, targetGrayCircle.x, targetGrayCircle.y);
            } else graphics.position.set(v.x, v.y);

            v.graphic = graphics;
            self._container.addChild(graphics);
        });
    }

    calcDefaultDegree(px: number, py: number, targetGrayCircleX: number, targetGrayCircleY: number) {
        const x = px >= targetGrayCircleX ? px - targetGrayCircleX : targetGrayCircleX - px;
        const y = py - targetGrayCircleY;
        return (px > targetGrayCircleX) ? Math.PI - Math.atan(y / x) : Math.atan(y / x); // 프로그래밍에선 각도를 radian으로 주로 사용함, px가 targetGrayCircleX보다 클 때는 PI값만큼 빼줘야 정상적으로 계산됨
    }

    motion() {
        const mgd = this.motionGraphicData;
        const gcd = this.grayCircleData;
        let t: number[] = [];

        mgd.forEach((v: IGraphicData, i: number) => t[i] = 0); // t 초기화

        this._app.ticker.add(() => {
            mgd.forEach((v: IGraphicData, i: number) => {
                if(v.hasOwnProperty('targetGrayCircleIdx')) { // 회색원 따라 도는 모션
                    const targetGcd = gcd[v.targetGrayCircleIdx];
                    let degree = t[i] + v.defaultDegree;
                    const x = targetGcd.x - targetGcd.radius * Math.cos(degree);
                    const y = targetGcd.y + targetGcd.radius * Math.sin(degree);

                    if(v['type'] === 'fillRect') {
                        const rectCenter = Math.sqrt(v.width * v.height) / 2; // 사각형 대각선 길이의 반
                        v.graphic.pivot.set(rectCenter, rectCenter);
                        v.graphic.rotation = Math.PI / 4 + degree; // 사각형은 90도 돌려야하는데 radian으로 계산하여 (Math.Pi / 180 * 45) 더해줌
                    }

                    v.graphic.position.set(x, y);

                    if(v['time']) t[i] += v['time'];
                } else {
                    v.graphic.position.set(v.x, v.y - t[i]);

                    if(t[i] >= v.maxTime && v.direction === 1) v.direction = -1;
                    else if(t[i] <= -v.maxTime && v.direction === -1) v.direction = 1;

                    if(v['time']) t[i] += (v.direction * v['time']);
                }
            });
        });
    }
}

const visual = new Visual();
export {visual};
export default Visual;