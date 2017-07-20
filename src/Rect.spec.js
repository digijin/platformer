import Rect from 'Rect';

describe('Rect', () => {
    describe('fromPosSizeRego', () => {
        it('should work', () => {
            let pos = {x: 100, y:200}
            let size = {w:50, h:50}
            let rego = {x:.5, y:1}
            let output = Rect.fromPosSizeRego(pos, size, rego);
            expect(output.t).toBe(150)
            expect(output.r).toBe(125)
            expect(output.b).toBe(200)
            expect(output.l).toBe(75)
        })
    })
})