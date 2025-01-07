class Observer {
}
export class SaveCompleteObserver extends Observer {
    listeners = [];
    subscribe(v) {
        this.listeners.push(v);
    }
    unsubscribe(name) {
        this.listeners = this.listeners.filter((listener) => listener.name !== name);
    }
    publish() {
        this.listeners.forEach((target) => {
            target.publish("Save complete");
        });
    }
}
