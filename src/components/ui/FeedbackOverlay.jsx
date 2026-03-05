const FeedbackOverlay = ({ showSuccess, showError }) => (
  <>
    {showSuccess && (
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
        <div className="bg-green-500 text-white px-12 py-8 rounded-3xl text-4xl font-bold shadow-2xl animate-bounce">
          Bravo ! 🌟
        </div>
      </div>
    )}

    {showError && (
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
        <div className="bg-red-500 text-white px-12 py-8 rounded-3xl text-4xl font-bold shadow-2xl animate-bounce">
          Réessaie ! 🔄
        </div>
      </div>
    )}
  </>
);

export default FeedbackOverlay;
