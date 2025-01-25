import React from 'react'
import { FileText, CheckCircle, Clock } from 'lucide-react'

function CardHome({heading, number}) {
    const getIcon = () => {
        switch(heading) {
            case "No. of Complaints":
                return <FileText className="text-green-700" size={48} />;
            case "No. of Resolved":
                return <CheckCircle className="text-green-700" size={48} />;
            case "No. of Pending":
                return <Clock className="text-green-700" size={48} />;
            default:
                return <FileText className="text-green-700" size={48} />;
        }
    }

    return (
        <div className=" flex items-center justify-center">
            <div className="w-80 bg-white/30 backdrop-blur-lg py-4 border border-white/20 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-green-50/40">
                <div className="flex justify-center mb-4">
                    {getIcon()}
                </div>
                <h1 className="text-2xl font-bold text-center text-green-900 mb-4">
                    {heading}
                </h1>
                <div className="text-center text-5xl font-extrabold text-green-800">
                    {number}
                </div>
            </div>
        </div>
    )
}

export default CardHome
