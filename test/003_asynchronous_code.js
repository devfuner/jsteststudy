describe('User', function() {
    describe('#save()', function() {
        it('should save without error', function(done) {
            class User {
                constructor(name) {
                    this.name = name;
                }

                save() {}
            }
            var user = new User('Luna');
            user.save(function(err) {
                if (err) done(err);
                else done();
            });
        });
    });

    beforeEach(function() {
        return db.clear()
            .then(function() {
                return db.save([tobi, loki, jane]);
            });
    });

    describe('#find()', function() {
        it('respond with matching records', function() {
            return db.find({type: 'User'}).should.eventually.have.length(3);
        });
    });
});