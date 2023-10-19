function pagination() {
  return (
    <div class="py-3">
      {Array(page)
        .fill()
        .map((x, index) => (
          <button
            type="btn-default d-inline p-2"
            onClick={() => getPage(index + 1)}
            value={index + 1}
          >
            {index + 1}
          </button>
        ))}
    </div>
  );
}
