interface SubmitButtonProps {
  disabled: boolean;
  loading: boolean;
  text: string;
}

const LoginButton: React.FC<SubmitButtonProps> = ({
  disabled,
  loading,
  text,
}) => (
  <div className="mt-6">
    <button
      type="submit"
      disabled={disabled}
      className="bg-slate-950 mt-5 w-full rounded-full h-[2.5rem] disabled:opacity-50 text-green-50 hover:bg-slate-800 flex justify-center items-center"
    >
      {!loading ? text : <div className="loader"></div>}
    </button>
  </div>
);

export default LoginButton;
