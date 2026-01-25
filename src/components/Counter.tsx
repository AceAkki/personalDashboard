type CounterProps = {
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
};
export const Counter = ({ count, setCount }: CounterProps) => {
  return (
    <div>   
        <h2>Current Count: {count}</h2>
        <button onClick={() => setCount(prev => prev + 1)}>Increment</button>  
        <button onClick={() => setCount(prev => prev - 1)}>Decrement</button>  
    </div>
  );
}