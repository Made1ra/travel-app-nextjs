export default function TripPrice({ price }: { price: number }) {
  return (
    <div>
      <span>Price</span>
      <strong
        data-test-id="trip-card-price-value"
        className="trip-price__value"
      >
        ${price}
      </strong>
    </div>
  );
}
