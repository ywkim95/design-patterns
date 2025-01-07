abstract class Observer {
  abstract subscribe(v: Listener): void;
  abstract unsubscribe(name: string): void;
  abstract publish(): void;
}

interface Listener {
  name: string;
  publish(event: string): void;
}

export class SaveCompleteObserver extends Observer {
  listeners: Listener[] = [];

  override subscribe(v: Listener): void {
    this.listeners.push(v);
  }

  override unsubscribe(name: string): void {
    this.listeners = this.listeners.filter((listener) => listener.name !== name);
  }

  override publish(): void {
    this.listeners.forEach((target) => {
      target.publish("Save complete");
    });
  }
}
