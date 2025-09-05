import React, { useEffect, useState } from 'react';
import '../User.scss';
import StarRating from '../../../StarRating/StarRating.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { getLocalStorage } from '../../../../services/helper.ts';
import { User } from '../../../../types/user.ts';
import { Avatar, Back } from '../../DashboardIcons.tsx'
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
    }).format(amount);
};

const UserDetails: React.FC = () => {
    const [activeTab, setActiveTab] = useState('General Details');
    const [user, setUser] = useState<User>();
    const navigate = useNavigate();
    const tabs = ['General Details', 'Documents', 'Bank Details', 'Loans', 'Savings', 'App and System'];
    const { pathname } = useLocation();
    const handleBack = () => {
        navigate('/dashboard/users')
    }
    useEffect(() => {
        const selectedUser = getLocalStorage('selectedUser');
        setUser(selectedUser)
    }, [])
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return (
        <div className="user-details">
            {/* Header */}
            <button onClick={handleBack} className="user-details__back"><Back />
                Back to Users</button>
            <header className="user-details__header">
                <h3>User Details</h3>
                <div className="user-details__actions">
                    <button className="user-details__blacklist">BLACKLIST USER</button>
                    <button className="user-details__activate">ACTIVATE USER</button>
                </div>
            </header>

            {/* Main Content */}
            {user && (
                <div className="user-details__main">
                    {/* User Card */}
                    <section className="user-card">
                        <div className="user-card__info">
                            <div className="user-card__avata"><Avatar />
                            </div>
                            <div>
                                <div className="user-card__details">
                                    <div className="user-card__personal">
                                        <h2>{user.personalInformation.fullName}</h2>
                                        <p>{user.personalInformation.phoneNumber}</p>
                                    </div>
                                    <svg width="1" height="80" viewBox="0 0 1 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <line opacity="0.2" x1="0.5" y1="2.18557e-08" x2="0.499997" y2="80" stroke="#545F7D" />
                                    </svg>

                                    <div className="user-card__rating">
                                        <h6>User's Tier</h6>

                                        <StarRating
                                            rating={Number(user?.tier) || 0}
                                            maxStars={3}
                                            size="15px"
                                            color="#E9B200"
                                        />


                                    </div>
                                    <svg width="1" height="80" viewBox="0 0 1 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <line opacity="0.2" x1="0.5" y1="2.18557e-08" x2="0.499997" y2="80" stroke="#545F7D" />
                                    </svg>

                                    <div className="user-card__bank-details">
                                        <h3>{formatCurrency(Math.round(Number(user.accountDetails.balance)))}</h3>
                                        <p>{user.accountDetails.accountNumber} / {user.accountDetails.bankName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Tabs */}
                        <div className="user-card__tabs">
                            {tabs.map((tab, i) => (
                                <button
                                    key={tab}
                                    className={`user-card__tab ${activeTab === tab ? 'active' : ''} count-${i}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </section>
                    {/* Tab Content */}
                    {activeTab === 'General Details' && (
                        <section className="details-section">
                            <h3>Personal Information</h3>
                            <div className="details-section__grid">
                                <div>
                                    <span>Full Name:</span>
                                    <p>{user.personalInformation.fullName}</p>
                                </div>
                                <div>
                                    <span>Phone Number:</span>
                                    <p>0{user.personalInformation.phoneNumber}</p>
                                </div>
                                <div>
                                    <span>Email Address:</span>
                                    <p>{user.personalInformation.email}</p>
                                </div>
                                <div>
                                    <span>BVN:</span>
                                    <p>{user.personalInformation.phoneNumber}</p>
                                </div>
                                <div>
                                    <span>Gender:</span>
                                    <p>{user.personalInformation.gender}</p>
                                </div>
                                <div>
                                    <span>Marital Status:</span>
                                    <p>{user.personalInformation.maritalStatus}</p>
                                </div>
                                <div>
                                    <span>Children:</span>
                                    <p>{user.personalInformation.children}</p>
                                </div>
                                <div>
                                    <span>Type of Residence:</span>
                                    <p>{user.personalInformation.typeOfResidence}</p>
                                </div>
                            </div>

                            <h3>Education and Employment</h3>
                            <div className="details-section__grid2">
                                <div>
                                    <span>Level of Education:</span>
                                    <p>{user.educationAndEmployment.levelOfEducation}</p>
                                </div>
                                <div>
                                    <span>Employment Status:</span>
                                    <p>{user.educationAndEmployment.employmentStatus}</p>
                                </div>
                                <div>
                                    <span>Sector of Employment:</span>
                                    <p>{user.educationAndEmployment.sectorOfEmployment}</p>
                                </div>
                                <div>
                                    <span>Duration of Employment:</span>
                                    <p>{user.educationAndEmployment.durationOfEmployment}</p>
                                </div>
                                <div>
                                    <span>Office Email:</span>
                                    <p>{user.educationAndEmployment.officeEmail}</p>
                                </div>
                                <div>
                                    <span>Monthly Income:</span>
                                    <p>{formatCurrency(Math.round(Number(user.educationAndEmployment.monthlyIncome[0])))} - {formatCurrency(Math.round(Number(user.educationAndEmployment.monthlyIncome[1])))}</p>
                                </div>
                                <div>
                                    <span>Loan Repayment:</span>
                                    <p>{formatCurrency(Math.round(Number(user.educationAndEmployment.loanRepayment)))}</p>
                                </div>
                            </div>

                            <h3>Socials</h3>
                            <div className="details-section__grid">
                                <div>
                                    <span>Twitter:</span>
                                    <p>{user.socials.twitter}</p>
                                </div>
                                <div>
                                    <span>Facebook:</span>
                                    <p>{user.socials.facebook}</p>
                                </div>
                                <div>
                                    <span>Instagram:</span>
                                    <p>{user.socials.instagram}</p>
                                </div>
                            </div>

                            <h3>Guarantor</h3>
                            <div className="details-section__grid">
                                <div>
                                    <span>Full Name:</span>
                                    <p>{user.guarantor.fullName}</p>
                                </div>
                                <div>
                                    <span>Phone Number:</span>
                                    <p>{user.guarantor.phoneNumber}</p>
                                </div>
                                <div>
                                    <span>Email Address:</span>
                                    <p>{user.guarantor.email}</p>
                                </div>
                                <div>
                                    <span>Relationship:</span>
                                    <p>{user.guarantor.relationship}</p>
                                </div>
                            </div>
                            <div className="details-section__grid3">
                                <div>
                                    <span>Full Name:</span>
                                    <p>{user.secondGuarantor.fullName}</p>
                                </div>
                                <div>
                                    <span>Phone Number:</span>
                                    <p>{user.secondGuarantor.phoneNumber}</p>
                                </div>
                                <div>
                                    <span>Email Address:</span>
                                    <p>{user.secondGuarantor.email}</p>
                                </div>
                                <div>
                                    <span>Relationship:</span>
                                    <p>{user.secondGuarantor.relationship}</p>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserDetails;
