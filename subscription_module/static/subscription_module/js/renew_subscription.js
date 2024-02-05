$(document).ready(function () {
    $('#plans').html('')

     //API of getting Plans
    $.ajax({
        method: 'GET',
        url: '/subscription/get_plans/',
        success: function (res) {
            if (res.status) {
                var plans = res.data;
                var interval = ''
                $.each(plans, function (index, val) {
                  
                    if (val.id !== res.subscription && val.id !== 1) { //checking if plan not equals to subscription
                        if (val.days_per_interval >= 28 && val.days_per_interval <= 31) { //if condition matches, then checking if subscription is monthly 
                            interval = 'Monthly'
                        } else { //else subscription is yearly
                            interval = 'Yearly'
                        }
                    //appending cards of showing plan name, price, and a button to proceed on a page of upgrade subscription
                    $('#plans').append(`
                        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 d-flex align-self-stretch mb-5">
                            <div class="plans-wrapper purple">
                                <div class="head">
                                    <h3 class="f-28 f-600 f-height-1-1 f-black text-center mb-1">${val.name}</h3>
                                    <p class="f-14 f-400 f-black-light text-center mb-1">Unlimited access to WebsiteRankingExpert's award winning growth tools</p>
                                    <p class="f-24 f-600 f-purple text-center mb-1">$ ${val.price}/${interval}</p>
                                    <p class="f-14 f-500 f-black text-center mb-4">Renews at just <span class="f-purple">$29.99</span> month</p>
                                </div>
                            <form>
                                <div class="row">
                                      
                                    <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                        <a class="btn custom-subscription-btn" href='/payment/add_card/?plan_id=${val.id}' style="color: white;">Proceed</a>
                                    </div>
                                </div>
                            </form>
                                <div class="items-wrapper">
                                    <div class="item item-1">
                                        <div class="d-flex justify-content-between mb-2">
                                            <h6 class="f-18 f-500 f-black mb-0">Growth Plan</h6>
                                            <h6 class="f-16 f-600 f-purple mb-0">Full</h6>
                                        </div>
                                        <p class="f-14 f-400 f-black-light mb-0">You'll get access to our most effective daily alerts and objectives.</p>
                                    </div>
                                    <div class="item item-2">
                                        <h6 class="f-18 f-500 f-black mb-2">Robust Website Monitoring</h6>
                                        <p class="f-14 f-400 f-black-light mb-0">10x the scans and more frequent monitoring of additional issues like email deliverability and competitor changes</p>
                                    </div>
                                    <div class="item item-3">
                                        <div class="d-flex justify-content-between mb-2">
                                            <h6 class="f-18 f-500 f-black mb-0">RankGuard®</h6>
                                            <h6 class="f-16 f-600 f-purple mb-0">1 scan/week</h6>
                                        </div>
                                        <p class="f-14 f-400 f-black-light mb-0">We'll check your current keyword rankings on Google every week. If you already deserve to rank higher for a term, we'll let you know. We'll also provide easy solutions for getting there.</p>
                                    </div>
                                    <div class="item item-4">
                                        <div class="d-flex justify-content-between mb-2">
                                            <h6 class="f-18 f-500 f-black mb-0">Keyword Explorer</h6>
                                            <h6 class="f-16 f-600 f-purple mb-0">Full</h6>
                                        </div>
                                        <p class="f-14 f-400 f-black-light mb-0">Full access to all our keyword attributes.</p>
                                    </div>
                                    <div class="item item-5">
                                        <div class="d-flex justify-content-between mb-2">
                                            <h6 class="f-18 f-500 f-black mb-0">Backlink Analysis</h6>
                                            <h6 class="f-16 f-600 f-purple mb-0">Full</h6>
                                        </div>
                                        <p class="f-14 f-400 f-black-light mb-0">Comprehensive access to all our backlinking software.</p>
                                    </div>
                                    <div class="item item-6">
                                        <h6 class="f-18 f-500 f-black mb-2">Competitor Analysis</h6>
                                        <p class="f-14 f-400 f-black-light mb-0">Add up to 6 competitors and track their rankings and traffic. We'll even tell you when they make a change to a page that improves their rankings, so you can see their strategy.</p>
                                    </div>
                                    <div class="item item-7">
                                        <h6 class="f-18 f-500 f-black mb-2">Weekly Snapshot</h6>
                                        <p class="f-14 f-400 f-black-light mb-0">More data, more often. Get a brief weekly report on your and your competitors' ranks, traffic, and other metrics.</p>
                                    </div>
                                    <div class="item item-8">
                                        <h6 class="f-18 f-500 f-black mb-2">Daily Health Score</h6>
                                        <p class="f-14 f-400 f-black-light mb-0">WebsiteRankingExpert's proprietary Health Score algorithm compares your daily performance to our predictions.</p>
                                    </div>
                                    <div class="item item-9">
                                        <div class="d-flex justify-content-between mb-2">
                                            <h6 class="f-18 f-500 f-black mb-0">Websites</h6>
                                            <h6 class="f-16 f-600 f-purple mb-0">Add Up to 30</h6>
                                        </div>
                                        <p class="f-14 f-400 f-black-light mb-0">Find out how your websites are doing on one screen, and get monitoring and data insights for your entire portfolio from one dashboard.</p>
                                    </div>
                                    <div class="item item-10">
                                        <h6 class="f-18 f-500 f-black mb-2">Email, Phone, and Chat Support</h6>
                                        <p class="f-14 f-400 f-black-light mb-0">Our highest level of devoted support. Pro associates can also organize a one-on-one Zoom discussion with a Growth Expert to review their site, SEO, and/or anything else.</p>
                                    </div>
                                    <div class="item item-11">
                                        <h6 class="f-18 f-500 f-black mb-2">Social Media</h6>
                                        <p class="f-14 f-400 f-black-light mb-0">We observe your actual performance and offer you a custom roadmap to develop this very meaningful channel.</p>
                                    </div>
                                    <div class="item item-12">
                                        <h6 class="f-18 f-500 f-black mb-2">Growth Expert Assistance</h6>
                                        <p class="f-14 f-400 f-black-light mb-0">Our professional human Growth Experts are available to assist with SEO, performance, and online strategy queries.</p>
                                    </div>
                                </div>
                            </div>
                            </div>
           `)
                    } 

                    else if (val.id === res.subscription && val.id !== 1) { //checking if plan equals to subscription
                        if (val.days_per_interval >= 28 && val.days_per_interval <= 31) { //if this condition matches, then checking if subscription is monthly 
                            interval = 'Monthly'
                        } else { //else subscription is yearly
                            interval = 'Yearly'
                        }
                        //appending cards of showing plan name, price, and a button to proceed on a page of upgrade subscription
                        $('#plans').append(`
                            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 d-flex align-self-stretch mb-5">
                                <div class="plans-wrapper purple">
                                    <div class="head">
                                        <h3 class="f-28 f-600 f-height-1-1 f-black text-center mb-1">${val.name}</h3>
                                        <p class="f-14 f-400 f-black-light text-center mb-1">Unlimited access to WebsiteRankingExpert's award winning growth tools</p>
                                        <p class="f-24 f-600 f-purple text-center mb-1">$ ${val.price}/${interval}</p>
                                        <p class="f-14 f-500 f-black text-center mb-4">Renews at just <span class="f-purple">$29.99</span> month</p>
                                    </div>
                                <form>
                                    <div class="row">
                                      
                                        <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <a class="btn custom-subscription-btn disable_btn" href="javascript:void(0)" style="color: white;" >Proceed</a>
                                        </div>
                                    </div>
                                </form>
                                <div class="items-wrapper">
                                    <div class="item item-1">
                                        <div class="d-flex justify-content-between mb-2">
                                            <h6 class="f-18 f-500 f-black mb-0">Growth Plan</h6>
                                            <h6 class="f-16 f-600 f-purple mb-0">Full</h6>
                                        </div>
                                        <p class="f-14 f-400 f-black-light mb-0">You'll get access to our most effective daily alerts and objectives.</p>
                                    </div>
                                    <div class="item item-2">
                                        <h6 class="f-18 f-500 f-black mb-2">Robust Website Monitoring</h6>
                                        <p class="f-14 f-400 f-black-light mb-0">10x the scans and more frequent monitoring of additional issues like email deliverability and competitor changes</p>
                                    </div>
                                    <div class="item item-3">
                                        <div class="d-flex justify-content-between mb-2">
                                            <h6 class="f-18 f-500 f-black mb-0">RankGuard®</h6>
                                            <h6 class="f-16 f-600 f-purple mb-0">1 scan/week</h6>
                                        </div>
                                        <p class="f-14 f-400 f-black-light mb-0">We'll check your current keyword rankings on Google every week. If you already deserve to rank higher for a term, we'll let you know. We'll also provide easy solutions for getting there.</p>
                                    </div>
                                    <div class="item item-4">
                                        <div class="d-flex justify-content-between mb-2">
                                            <h6 class="f-18 f-500 f-black mb-0">Keyword Explorer</h6>
                                            <h6 class="f-16 f-600 f-purple mb-0">Full</h6>
                                        </div>
                                        <p class="f-14 f-400 f-black-light mb-0">Full access to all our keyword attributes.</p>
                                    </div>
                                    <div class="item item-5">
                                        <div class="d-flex justify-content-between mb-2">
                                            <h6 class="f-18 f-500 f-black mb-0">Backlink Analysis</h6>
                                            <h6 class="f-16 f-600 f-purple mb-0">Full</h6>
                                        </div>
                                        <p class="f-14 f-400 f-black-light mb-0">Comprehensive access to all our backlinking software.</p>
                                    </div>
                                    <div class="item item-6">
                                        <h6 class="f-18 f-500 f-black mb-2">Competitor Analysis</h6>
                                        <p class="f-14 f-400 f-black-light mb-0">Add up to 6 competitors and track their rankings and traffic. We'll even tell you when they make a change to a page that improves their rankings, so you can see their strategy.</p>
                                    </div>
                                    <div class="item item-7">
                                        <h6 class="f-18 f-500 f-black mb-2">Weekly Snapshot</h6>
                                        <p class="f-14 f-400 f-black-light mb-0">More data, more often. Get a brief weekly report on your and your competitors' ranks, traffic, and other metrics.</p>
                                    </div>
                                    <div class="item item-8">
                                        <h6 class="f-18 f-500 f-black mb-2">Daily Health Score</h6>
                                        <p class="f-14 f-400 f-black-light mb-0">WebsiteRankingExpert's proprietary Health Score algorithm compares your daily performance to our predictions.</p>
                                    </div>
                                    <div class="item item-9">
                                        <div class="d-flex justify-content-between mb-2">
                                            <h6 class="f-18 f-500 f-black mb-0">Websites</h6>
                                            <h6 class="f-16 f-600 f-purple mb-0">Add Up to 30</h6>
                                        </div>
                                        <p class="f-14 f-400 f-black-light mb-0">Find out how your websites are doing on one screen, and get monitoring and data insights for your entire portfolio from one dashboard.</p>
                                    </div>
                                    <div class="item item-10">
                                        <h6 class="f-18 f-500 f-black mb-2">Email, Phone, and Chat Support</h6>
                                        <p class="f-14 f-400 f-black-light mb-0">Our highest level of devoted support. Pro associates can also organize a one-on-one Zoom discussion with a Growth Expert to review their site, SEO, and/or anything else.</p>
                                    </div>
                                    <div class="item item-11">
                                        <h6 class="f-18 f-500 f-black mb-2">Social Media</h6>
                                        <p class="f-14 f-400 f-black-light mb-0">We observe your actual performance and offer you a custom roadmap to develop this very meaningful channel.</p>
                                    </div>
                                    <div class="item item-12">
                                        <h6 class="f-18 f-500 f-black mb-2">Growth Expert Assistance</h6>
                                        <p class="f-14 f-400 f-black-light mb-0">Our professional human Growth Experts are available to assist with SEO, performance, and online strategy queries.</p>
                                    </div>
                                </div>
                            </div>
                            </div>
           `)
                    }
                })
            }
            // console.log(res.data, 'plan res')

        }
    })
})