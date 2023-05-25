const { createHmac, randomBytes } = await import('node:crypto');

class Encryption {
    constructor() {
        this._key;
        this._hmac;
    }

    _generateKey = () => {
        this._key = randomBytes(32).toString('hex');
    };

    generateHmac = (move) => {
        this._generateKey();
        this._hmac = createHmac('sha256', this._key).update(move).digest('hex');
        return { hmac: this._hmac, key: this._key };
    };
}

export default Encryption;
