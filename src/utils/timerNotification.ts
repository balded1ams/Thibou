import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const startTimerWithNotifications = (t: number, t1: number, t2: number, t3: number) => {

    const notify = (message: string) => {
        toast.info(message, {
        });
    };

    const endTime = new Date().getTime() + t * 60000;
    const notified = { t1: false, t2: false, t3: false };

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = endTime - now;

        if (timeLeft <= 0) {
            clearInterval(interval);
            notify('Passer à la suite si vous ne voulez pas être en retard !');
        } else if (timeLeft <= t3 * 60000 && !notified.t3) {
            notified.t3 = true;
            notify(`Si vous voulez respecter le temps imparti, il vous reste ${t3} secondes`);
        } else if (timeLeft <= t2 * 60000 && !notified.t2) {
            notified.t2 = true;
            notify(`Si vous voulez respecter le temps imparti, il vous reste ${t2} secondes`);
        } else if (timeLeft <= t1 * 60000 && !notified.t1) {
            notified.t1 = true;
            notify(`Si vous voulez respecter le temps imparti, il vous reste ${t1} secondes`);
        }
    }, 1000);
};