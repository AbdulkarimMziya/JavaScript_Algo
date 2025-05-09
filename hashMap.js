function createHashMap() {
    const capacity = 16;

    const state = {
        load_factor: 0.75,
        capacity,
        buckets: Array.from({ length: capacity }, () => []),
        size: 0,
    };

    const hashKey = (key) => {
        let hashCode = 0;
        const prime = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = prime * hashCode + key.charCodeAt(i);
        }
        return hashCode % state.capacity;
    };

    let thisHashMap;

    const resize = () => {
        const oldBuckets = state.buckets;
        state.capacity *= 2;
        state.buckets = Array.from({ length: state.capacity }, () => []);
        state.size = 0;

        for (const bucket of oldBuckets) {
            for (const [key, value] of bucket) {
                thisHashMap.set(key, value);
            }
        }
    };

    const methods = mapMethods(state, hashKey, resize);

    thisHashMap = Object.assign({}, state, methods);

    return thisHashMap;
}

const mapMethods = (state, hashKey, resize) => {
    const api = {
        set(key, value) {
            if (state.size / state.capacity > state.load_factor) {
                resize();
            }

            const index = hashKey(key);
            const bucket = state.buckets[index];

            for (let pair of bucket) {
                if (pair[0] === key) {
                    pair[1] = value;
                    return;
                }
            }

            bucket.push([key, value]);
            state.size++;
        },

        get(key) {
            const index = hashKey(key);
            const bucket = state.buckets[index];

            for (let pair of bucket) {
                if (pair[0] === key) {
                    return pair[1];
                }
            }
            return null;
        },

        has(key) {
            const index = hashKey(key);
            const bucket = state.buckets[index];

            for (let pair of bucket) {
                if (pair[0] === key) {
                    return true;
                }
            }
            return false;
        },

        remove(key) {
            const index = hashKey(key);
            const bucket = state.buckets[index];

            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i][0] === key) {
                    bucket.splice(i, 1);
                    state.size--;
                    return true;
                }
            }

            return false;
        },

        length() {
            return state.size;
        },

        clear() {
            state.buckets = Array.from({ length: state.capacity }, () => []);
            state.size = 0;
        },

        keys() {
            const allKeys = [];
            for (const bucket of state.buckets) {
                for (const [key, _] of bucket) {
                    allKeys.push(key);
                }
            }
            return allKeys;
        },

        values() {
            const allValues = [];
            for (const bucket of state.buckets) {
                for (const [_, value] of bucket) {
                    allValues.push(value);
                }
            }
            return allValues;
        },

        entries() {
            const allEntries = [];
            for (const bucket of state.buckets) {
                for (const pair of bucket) {
                    allEntries.push(pair);
                }
            }
            return allEntries;
        }
    };

    return api;
};
