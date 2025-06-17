import { useState, useEffect } from "react";

interface TimeAgoProps {
  date: string; // ISO format date
}

const getShortTimeAgo = (date: string): string => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals: { [key: string]: number } = {
    y: 31536000, // years
    mo: 2592000, // months
    w: 604800, // weeks
    d: 86400, // days
    h: 3600, // hours
    m: 60, // minutes
    s: 1, // seconds
  };

  for (const key in intervals) {
    const interval = Math.floor(diffInSeconds / intervals[key]);
    if (interval >= 1) {
      return `${interval}${key}`;
    }
  }
  return "Now";
};

const TimeAgo: React.FC<TimeAgoProps> = ({ date }) => {
  const [timeAgo, setTimeAgo] = useState<string>(getShortTimeAgo(date));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(getShortTimeAgo(date));
    }, 60000);

    return () => clearInterval(interval);
  }, [date]);

  return <span className="text-muted-foreground">{timeAgo} ago</span>;
};

export default TimeAgo;
