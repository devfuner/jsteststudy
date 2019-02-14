describe('Detects Multiple Calls to done()', function() {
    describe('#multiple call done()', function() {
        it('double done', function(done) {
            setImmediate(done);
            setImmediate(done);
        })
    })
})