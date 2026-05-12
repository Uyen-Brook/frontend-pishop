// src/components/common/ErrorMessage.tsx

interface ErrorMessageProps {
    message: string;
}

export default function ErrorMessage({
    message,
}: ErrorMessageProps) {
    return (
        <div className="rounded-md border border-red-300 bg-red-50 p-4 text-red-700">
            {message}
        </div>
    );
}