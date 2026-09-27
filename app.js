// ==========================================
// MINIFLOW - COMPLETE APP.JS
// ==========================================


// ==========================================
// BASIC HELPERS
// ==========================================

function getShipments() {

    return JSON.parse(
        localStorage.getItem("miniflowShipments") || "[]"
    );

}


function saveShipments(shipments) {

    localStorage.setItem(
        "miniflowShipments",
        JSON.stringify(shipments)
    );

}


function safeText(value) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return "-";

    }

    return String(value);

}


function formatCurrency(value) {

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2
        }
    ).format(Number(value) || 0);

}


function main() {

    return document.getElementById(
        "mainContent"
    );

}


function setActiveMenu(name) {

    document
        .querySelectorAll(".menu-item")
        .forEach(function(item) {

            item.classList.toggle(
                "active",
                item.dataset.menu === name
            );

        });

}


function getStatusBadge(status) {

    let className = "status";


    if (status === "Delivered") {

        className +=
            " status-delivered";

    }


    else if (
        status === "NDR" ||
        status === "NPR"
    ) {

        className +=
            " status-ndr";

    }


    else if (status === "RTO") {

        className +=
            " status-rto";

    }


    else if (status === "Reattempt") {

        className +=
            " status-retry";

    }


    return `
        <span class="${className}">
            ${safeText(status)}
        </span>
    `;

}


function statCard(label, value) {

    return `

        <div class="stat-card">

            <div class="stat-label">
                ${label}
            </div>

            <div class="stat-value">
                ${value}
            </div>

        </div>

    `;

}


function field(
    labelText,
    id,
    type,
    placeholder,
    extra = ""
) {

    return `

        <div class="field">

            <label>
                ${labelText}
            </label>

            <input
                id="${id}"
                type="${type}"
                placeholder="${placeholder}"
                ${extra}
            >

        </div>

    `;

}


function detail(label, value) {

    return `

        <div class="field">

            <label>
                ${label}
            </label>

            <input
                value="${safeText(value)}"
                readonly
            >

        </div>

    `;

}


// ==========================================
// DASHBOARD
// ==========================================

function showDashboard() {

    setActiveMenu("Dashboard");


    main().innerHTML = `

        <!-- TOP HEADER -->

        <div class="topbar">

            <div class="search-box">

                <span>
                    🔍
                </span>

                <input
                    id="globalSearch"
                    type="text"
                    placeholder="Search by AWB, Order ID, Customer..."
                    oninput="globalSearch()"
                >

            </div>


            <div class="header-actions">

                <button
                    class="header-action header-create"
                    onclick="openCreateShipment()"
                >
                    ＋ <b>Create</b>
                </button>


                <button
                    class="header-action header-shipments"
                    onclick="openShipments()"
                >
                    📦 <b>Shipments</b>
                </button>


                <button
                    class="header-action header-track"
                    onclick="openTracking()"
                >
                    🔍 <b>Track</b>
                </button>


                <button
                    class="header-action header-ndr"
                    onclick="openNDR()"
                >
                    ⚠️ <b>NDR</b>
                </button>


                <div class="notification">

                    🔔

                    <div class="notification-count">
                        3
                    </div>

                </div>


                <div class="profile">

                    <div class="profile-avatar">
                        P
                    </div>

                    <div>

                        <div class="profile-name">
                            Pooja N M
                        </div>

                        <div class="profile-role">
                            Key Account Manager
                        </div>

                    </div>

                    <span>
                        ⌄
                    </span>

                </div>

            </div>

        </div>


        <!-- HERO -->

        <section class="hero">

            <div class="hero-content">

                <h1>
                    Welcome back, Pooja! 👋
                </h1>

                <p>
                    Here's what's happening with your shipments today.
                </p>

                <div class="hero-tag">
                    🚀 Fast • Reliable • Smart Logistics
                </div>

            </div>

        </section>


        <!-- KPI -->

        <section class="kpi-grid">

            <div class="kpi kpi-blue">

                <div class="kpi-top">

                    <div class="kpi-icon">
                        📦
                    </div>

                    <div class="kpi-title">
                        Total Shipments
                    </div>

                </div>

                <div
                    class="kpi-value"
                    id="dashboardTotalShipments"
                >
                    0
                </div>

                <div class="kpi-change">
                    ↑ Shipment volume
                </div>

            </div>


            <div class="kpi kpi-green">

                <div class="kpi-top">

                    <div class="kpi-icon">
                        🚚
                    </div>

                    <div class="kpi-title">
                        Delivered
                    </div>

                </div>

                <div
                    class="kpi-value"
                    id="dashboardDelivered"
                >
                    0
                </div>

                <div class="kpi-change">
                    ✓ Successfully delivered
                </div>

            </div>


            <div class="kpi kpi-orange">

                <div class="kpi-top">

                    <div class="kpi-icon">
                        🚛
                    </div>

                    <div class="kpi-title">
                        In Transit
                    </div>

                </div>

                <div
                    class="kpi-value"
                    id="dashboardInTransit"
                >
                    0
                </div>

                <div class="kpi-change">
                    ↗ Currently moving
                </div>

            </div>


            <div class="kpi kpi-red">

                <div class="kpi-top">

                    <div class="kpi-icon">
                        ⚠️
                    </div>

                    <div class="kpi-title">
                        NDR / NPR
                    </div>

                </div>

                <div
                    class="kpi-value"
                    id="dashboardNDR"
                >
                    0
                </div>

                <div class="kpi-change">
                    ⚠ Attention required
                </div>

            </div>


            <div class="kpi kpi-purple">

                <div class="kpi-top">

                    <div class="kpi-icon">
                        ⏱️
                    </div>

                    <div class="kpi-title">
                        Pending
                    </div>

                </div>

                <div
                    class="kpi-value"
                    id="dashboardPending"
                >
                    0
                </div>

                <div class="kpi-change">
                    ↗ Awaiting processing
                </div>

            </div>

        </section>


        <!-- DASHBOARD MIDDLE -->

        <section class="dashboard-grid">


            <!-- SHIPMENT CHART -->

            <div class="card">

                <div class="card-header">

                    <div class="card-title">
                        Shipment Trend
                    </div>

                    <select class="select-small">

                        <option>
                            Last 6 Months
                        </option>

                        <option>
                            This Year
                        </option>

                    </select>

                </div>


                <div class="chart-area">

                    <div
                        class="chart-grid-lines"
                    ></div>


                    ${chartColumn(
                        "Apr",
                        65,
                        18,
                        8
                    )}


                    ${chartColumn(
                        "May",
                        58,
                        20,
                        9
                    )}


                    ${chartColumn(
                        "Jun",
                        72,
                        16,
                        8
                    )}


                    ${chartColumn(
                        "Jul",
                        67,
                        18,
                        7
                    )}


                    ${chartColumn(
                        "Aug",
                        76,
                        14,
                        8
                    )}


                    ${chartColumn(
                        "Sep",
                        83,
                        12,
                        7
                    )}

                </div>


                <div class="legend">

                    <div class="legend-item">

                        <span
                            class="legend-dot"
                            style="background:#2563eb"
                        ></span>

                        Delivered

                    </div>


                    <div class="legend-item">

                        <span
                            class="legend-dot"
                            style="background:#10b981"
                        ></span>

                        In Transit

                    </div>


                    <div class="legend-item">

                        <span
                            class="legend-dot"
                            style="background:#f97316"
                        ></span>

                        NDR

                    </div>

                </div>

            </div>


            <!-- REGION -->

            <div class="card">

                <div class="card-header">

                    <div class="card-title">
                        Shipments by Region
                    </div>

                </div>


                <div class="region-map">

                    <div class="india-shape">
                        🇮🇳
                    </div>


                    <div class="region-label north">

                        North

                        <strong>
                            39.73%
                        </strong>

                    </div>


                    <div class="region-label west">

                        West

                        <strong>
                            28.17%
                        </strong>

                    </div>


                    <div class="region-label east">

                        East

                        <strong>
                            11.00%
                        </strong>

                    </div>


                    <div class="region-label south">

                        South

                        <strong>
                            21.10%
                        </strong>

                    </div>

                </div>

            </div>


            <!-- CARRIER PERFORMANCE -->

            <div class="card">

                <div class="card-header">

                    <div class="card-title">
                        Carrier Performance
                    </div>

                    <select class="select-small">

                        <option>
                            This Month
                        </option>

                    </select>

                </div>


                ${carrierRow(
                    "🚚",
                    "Delhivery",
                    91,
                    "progress-blue"
                )}


                ${carrierRow(
                    "✈️",
                    "Blue Dart",
                    88,
                    "progress-green"
                )}


                ${carrierRow(
                    "📦",
                    "XpressBees",
                    85,
                    "progress-orange"
                )}


                ${carrierRow(
                    "🚛",
                    "DTDC",
                    83,
                    "progress-purple"
                )}


                ${carrierRow(
                    "📮",
                    "Ecom Express",
                    81,
                    "progress-red"
                )}

            </div>

        </section>


        <!-- LOWER -->

        <section class="lower-grid">


            <!-- RECENT SHIPMENTS -->

            <div class="card">

                <div class="card-header">

                    <div class="card-title">
                        Recent Shipments
                    </div>

                    <span
                        class="view-button"
                        onclick="openShipments()"
                    >
                        View All →
                    </span>

                </div>


                <div
                    style="
                        overflow-x:auto;
                    "
                >

                    <table class="shipment-table">

                        <thead>

                            <tr>

                                <th>
                                    AWB Number
                                </th>

                                <th>
                                    Order ID
                                </th>

                                <th>
                                    Customer
                                </th>

                                <th>
                                    Carrier
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Date
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody
                            id="dashboardShipmentTable"
                        ></tbody>

                    </table>

                </div>

            </div>


            <!-- NOTIFICATIONS -->

            <div class="card">

                <div class="card-header">

                    <div class="card-title">
                        Notifications
                    </div>

                </div>


                <div class="notification-row">

                    <div
                        class="notice-icon notice-red"
                    >
                        !
                    </div>

                    <div class="notice-text">

                        <strong>
                            Shipment attention
                        </strong>

                        <br>

                        Check your NDR shipments.

                    </div>

                    <div class="notice-time">
                        Now
                    </div>

                </div>


                <div class="notification-row">

                    <div
                        class="notice-icon notice-blue"
                    >
                        i
                    </div>

                    <div class="notice-text">

                        Tracking updates are available.

                    </div>

                    <div class="notice-time">
                        2h
                    </div>

                </div>


                <div class="notification-row">

                    <div
                        class="notice-icon notice-green"
                    >
                        ✓
                    </div>

                    <div class="notice-text">

                        Miniflow is running successfully.

                    </div>

                    <div class="notice-time">
                        Today
                    </div>

                </div>


                <div class="notification-row">

                    <div
                        class="notice-icon notice-purple"
                    >
                        🚚
                    </div>

                    <div class="notice-text">

                        New shipment activity detected.

                    </div>

                    <div class="notice-time">
                        Today
                    </div>

                </div>


                <div class="notification-row">

                    <div
                        class="notice-icon notice-orange"
                    >
                        🔔
                    </div>

                    <div class="notice-text">

                        Review carrier performance.

                    </div>

                    <div class="notice-time">
                        Today
                    </div>

                </div>

            </div>

        </section>


        <div class="footer">

            © 2026 Miniflow Logistics Management

        </div>

    `;


    updateDashboard();

}


// ==========================================
// CHART
// ==========================================

function chartColumn(
    month,
    delivered,
    transit,
    ndr
) {

    return `

        <div class="chart-column">

            <div class="bar-group">

                <div
                    class="bar bar-blue"
                    style="
                        height:${delivered}%;
                    "
                ></div>

                <div
                    class="bar bar-green"
                    style="
                        height:${transit}%;
                    "
                ></div>

                <div
                    class="bar bar-orange"
                    style="
                        height:${ndr}%;
                    "
                ></div>

            </div>


            <span class="chart-label">

                ${month}

            </span>

        </div>

    `;

}


// ==========================================
// CARRIER ROW
// ==========================================

function carrierRow(
    icon,
    name,
    percentage,
    progressClass
) {

    return `

        <div class="carrier-row">

            <div class="carrier-head">

                <div class="carrier-name">

                    <span class="carrier-logo">

                        ${icon}

                    </span>

                    ${name}

                </div>

                <span>
                    ${percentage}%
                </span>

            </div>


            <div class="progress">

                <div
                    class="progress-bar ${progressClass}"
                    style="
                        width:${percentage}%;
                    "
                ></div>

            </div>

        </div>

    `;

}


// ==========================================
// UPDATE DASHBOARD
// ==========================================

function updateDashboard() {

    const shipments =
        getShipments();


    const delivered =
        shipments.filter(
            function(shipment) {

                return shipment.status ===
                    "Delivered";

            }
        ).length;


    const transit =
        shipments.filter(
            function(shipment) {

                return [

                    "Picked Up",

                    "In Transit",

                    "Out for Delivery"

                ].includes(
                    shipment.status
                );

            }
        ).length;


    const ndr =
        shipments.filter(
            function(shipment) {

                return [

                    "NDR",

                    "NPR",

                    "Reattempt"

                ].includes(
                    shipment.status
                );

            }
        ).length;


    const pending =
        shipments.filter(
            function(shipment) {

                return [

                    "AWB Generated",

                    "Pending"

                ].includes(
                    shipment.status
                );

            }
        ).length;


    setText(
        "dashboardTotalShipments",
        shipments.length
    );


    setText(
        "dashboardDelivered",
        delivered
    );


    setText(
        "dashboardInTransit",
        transit
    );


    setText(
        "dashboardNDR",
        ndr
    );


    setText(
        "dashboardPending",
        pending
    );


    const table =
        document.getElementById(
            "dashboardShipmentTable"
        );


    if (!table) {

        return;

    }


    if (!shipments.length) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    style="
                        text-align:center;
                        padding:30px;
                        color:#8492ab;
                    "
                >

                    No shipments available yet.

                    Create your first shipment.

                </td>

            </tr>

        `;

        return;

    }


    const recent =
        shipments
            .slice()
            .reverse()
            .slice(0, 5);


    table.innerHTML =
        recent.map(
            function(shipment) {

                return `

                    <tr>

                        <td>

                            <span class="awb">

                                ${safeText(
                                    shipment.awb
                                )}

                            </span>

                        </td>


                        <td>

                            ${safeText(
                                shipment.orderId
                            )}

                        </td>


                        <td>

                            ${safeText(
                                shipment.customerName
                            )}

                        </td>


                        <td>

                            ${safeText(
                                shipment.carrier
                            )}

                        </td>


                        <td>

                            ${getStatusBadge(
                                shipment.status
                            )}

                        </td>


                        <td>

                            ${safeText(
                                shipment.orderDate ||
                                shipment.createdAt
                            )}

                        </td>


                        <td>

                            <span
                                class="view-button"
                                onclick="
                                    openShipmentDetails(
                                        '${shipment.awb}'
                                    )
                                "
                            >
                                👁
                            </span>

                        </td>

                    </tr>

                `;

            }
        ).join("");

}


// ==========================================
// SET TEXT
// ==========================================

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value;

    }

}


// ==========================================
// CREATE SHIPMENT
// ==========================================

function openCreateShipment() {

    setActiveMenu(
        "Create Shipment"
    );


    main().innerHTML = `

        <div class="page-header">

            <div>

                <h1>
                    Create Shipment
                </h1>

                <p>
                    Create a new order and generate an AWB.
                </p>

            </div>

        </div>


        <div class="panel">


            <h2>
                Order Details
            </h2>


            <div class="form-grid">

                ${field(
                    "Order ID *",
                    "orderId",
                    "text",
                    "Enter order ID"
                )}


                ${field(
                    "Order Date *",
                    "orderDate",
                    "date",
                    ""
                )}


                ${field(
                    "Invoice Number",
                    "invoiceNumber",
                    "text",
                    "Invoice number"
                )}


                ${field(
                    "Invoice Value",
                    "invoiceValue",
                    "number",
                    "Invoice value"
                )}

            </div>


            <h2
                style="
                    margin-top:30px;
                "
            >
                Pickup Details
            </h2>


            <div class="form-grid">

                ${field(
                    "Warehouse",
                    "warehouse",
                    "text",
                    "Warehouse name"
                )}


                ${field(
                    "Pickup Contact",
                    "pickupContact",
                    "text",
                    "Contact name"
                )}


                ${field(
                    "Pickup Phone",
                    "pickupPhone",
                    "tel",
                    "Phone"
                )}


                ${field(
                    "Pickup City",
                    "pickupCity",
                    "text",
                    "City"
                )}


                ${field(
                    "Pickup State",
                    "pickupState",
                    "text",
                    "State"
                )}


                ${field(
                    "Pickup Pincode",
                    "pickupPincode",
                    "text",
                    "Pincode"
                )}


                ${field(
                    "Pickup Address",
                    "pickupAddress",
                    "text",
                    "Full address"
                )}

            </div>


            <h2
                style="
                    margin-top:30px;
                "
            >
                Delivery Details
            </h2>


            <div class="form-grid">

                ${field(
                    "Customer Name *",
                    "customerName",
                    "text",
                    "Customer name"
                )}


                ${field(
                    "Customer Phone",
                    "customerPhone",
                    "tel",
                    "Phone"
                )}


                ${field(
                    "Delivery City",
                    "deliveryCity",
                    "text",
                    "City"
                )}


                ${field(
                    "Delivery State",
                    "deliveryState",
                    "text",
                    "State"
                )}


                ${field(
                    "Delivery Pincode",
                    "deliveryPincode",
                    "text",
                    "Pincode"
                )}


                ${field(
                    "Delivery Address",
                    "deliveryAddress",
                    "text",
                    "Full address"
                )}

            </div>


            <h2
                style="
                    margin-top:30px;
                "
            >
                Package Details
            </h2>


            <div class="form-grid">

                ${field(
                    "Product",
                    "product",
                    "text",
                    "Product name"
                )}


                ${field(
                    "Quantity",
                    "quantity",
                    "number",
                    "1"
                )}


                ${field(
                    "Actual Weight (kg) *",
                    "actualWeight",
                    "number",
                    "10"
                )}


                ${field(
                    "Length (cm)",
                    "length",
                    "number",
                    "50"
                )}


                ${field(
                    "Breadth (cm)",
                    "breadth",
                    "number",
                    "40"
                )}


                ${field(
                    "Height (cm)",
                    "height",
                    "number",
                    "30"
                )}


                ${field(
                    "Volumetric Weight (kg)",
                    "volumetricWeight",
                    "number",
                    "Calculated",
                    "readonly"
                )}


                ${field(
                    "Chargeable Weight (kg)",
                    "chargeableWeight",
                    "number",
                    "Calculated",
                    "readonly"
                )}

            </div>


            <h2
                style="
                    margin-top:30px;
                "
            >
                Shipping Details
            </h2>


            <div class="form-grid">


                <div class="field">

                    <label>
                        Payment Type
                    </label>

                    <select
                        id="paymentType"
                    >

                        <option>
                            Prepaid
                        </option>

                        <option>
                            COD
                        </option>

                    </select>

                </div>


                <div class="field">

                    <label>
                        Carrier
                    </label>

                    <select
                        id="carrier"
                    ></select>

                </div>


                <div class="field">

                    <label>
                        Service
                    </label>

                    <select
                        id="service"
                    >

                        <option>
                            Surface
                        </option>

                        <option>
                            Express
                        </option>

                        <option>
                            Air
                        </option>

                    </select>

                </div>


                ${field(
                    "COD Amount",
                    "codAmount",
                    "number",
                    "0"
                )}

            </div>


            <div
                style="
                    margin-top:30px;
                    display:flex;
                    gap:10px;
                "
            >

                <button
                    class="primary-button"
                    onclick="createShipment()"
                >
                    Generate Shipment
                </button>


                <button
                    class="secondary-button"
                    onclick="showDashboard()"
                >
                    Cancel
                </button>

            </div>

        </div>

    `;


    populateCarrierSelect(
        "carrier"
    );


    setupWeightCalculation();

}


// ==========================================
// CARRIER SELECT
// ==========================================

function populateCarrierSelect(
    id
) {

    const select =
        document.getElementById(id);


    if (!select) {

        return;

    }


    const carriers = [

        {
            name: "Delhivery",
            service: "Surface",
            status: "Active"
        },

        {
            name: "Blue Dart Express",
            service: "Express",
            status: "Active"
        },

        {
            name: "DTDC",
            service: "Surface",
            status: "Active"
        },

        {
            name: "XpressBees",
            service: "Surface",
            status: "Active"
        },

        {
            name: "Ekart Express",
            service: "Express",
            status: "Inactive"
        }

    ];


    const saved =
        JSON.parse(
            localStorage.getItem(
                "miniflowCarriers"
            ) || "[]"
        );


    const all =
        [
            ...carriers,
            ...saved
        ];


    const unique =
        all.filter(
            function(item, index, array) {

                return (
                    array.findIndex(
                        function(x) {

                            return x.name ===
                                item.name;

                        }
                    ) === index
                );

            }
        );


    select.innerHTML =
        unique
            .filter(
                function(carrier) {

                    return carrier.status !==
                        "Inactive";

                }
            )
            .map(
                function(carrier) {

                    return `

                        <option
                            value="${carrier.name}"
                        >

                            ${carrier.name}

                        </option>

                    `;

                }
            )
            .join("");

}


// ==========================================
// WEIGHT
// ==========================================

function setupWeightCalculation() {

    [

        "actualWeight",

        "length",

        "breadth",

        "height"

    ].forEach(
        function(id) {

            const element =
                document.getElementById(id);


            if (element) {

                element.addEventListener(
                    "input",
                    calculateWeight
                );

            }

        }
    );


    calculateWeight();

}


function calculateWeight() {

    const actual =
        Number(
            document.getElementById(
                "actualWeight"
            )?.value
        ) || 0;


    const length =
        Number(
            document.getElementById(
                "length"
            )?.value
        ) || 0;


    const breadth =
        Number(
            document.getElementById(
                "breadth"
            )?.value
        ) || 0;


    const height =
        Number(
            document.getElementById(
                "height"
            )?.value
        ) || 0;


    let volumetric = 0;


    if (
        length &&
        breadth &&
        height
    ) {

        volumetric =
            (
                length *
                breadth *
                height
            ) / 5000;

    }


    const chargeable =
        Math.max(
            actual,
            volumetric
        );


    const volumetricElement =
        document.getElementById(
            "volumetricWeight"
        );


    const chargeableElement =
        document.getElementById(
            "chargeableWeight"
        );


    if (volumetricElement) {

        volumetricElement.value =
            volumetric
                ? volumetric.toFixed(2)
                : "";

    }


    if (chargeableElement) {

        chargeableElement.value =
            chargeable
                ? chargeable.toFixed(2)
                : "";

    }

}


// ==========================================
// SAVE SHIPMENT
// ==========================================

function createShipment() {

    const orderId =
        document.getElementById(
            "orderId"
        ).value.trim();


    const customerName =
        document.getElementById(
            "customerName"
        ).value.trim();


    const actualWeight =
        Number(
            document.getElementById(
                "actualWeight"
            ).value
        );


    if (!orderId) {

        alert(
            "Please enter Order ID."
        );

        return;

    }


    if (!customerName) {

        alert(
            "Please enter Customer Name."
        );

        return;

    }


    if (
        !actualWeight ||
        actualWeight <= 0
    ) {

        alert(
            "Please enter a valid Actual Weight."
        );

        return;

    }


    const awb =
        "MF" +
        Math.floor(
            1000000000 +
            Math.random() *
            9000000000
        );


    const now =
        new Date().toLocaleString();


    const shipment = {

        awb: awb,

        orderId:
            orderId,

        orderDate:
            document.getElementById(
                "orderDate"
            ).value ||
            new Date()
                .toISOString()
                .slice(0,10),

        invoiceNumber:
            document.getElementById(
                "invoiceNumber"
            ).value,

        invoiceValue:
            document.getElementById(
                "invoiceValue"
            ).value,

        customerName:
            customerName,

        customerPhone:
            document.getElementById(
                "customerPhone"
            ).value,

        warehouse:
            document.getElementById(
                "warehouse"
            ).value,

        pickupContact:
            document.getElementById(
                "pickupContact"
            ).value,

        pickupPhone:
            document.getElementById(
                "pickupPhone"
            ).value,

        pickupCity:
            document.getElementById(
                "pickupCity"
            ).value,

        pickupState:
            document.getElementById(
                "pickupState"
            ).value,

        pickupAddress:
            document.getElementById(
                "pickupAddress"
            ).value,

        pickupPincode:
            document.getElementById(
                "pickupPincode"
            ).value,

        deliveryCity:
            document.getElementById(
                "deliveryCity"
            ).value,

        deliveryState:
            document.getElementById(
                "deliveryState"
            ).value,

        deliveryAddress:
            document.getElementById(
                "deliveryAddress"
            ).value,

        deliveryPincode:
            document.getElementById(
                "deliveryPincode"
            ).value,

        product:
            document.getElementById(
                "product"
            ).value,

        quantity:
            document.getElementById(
                "quantity"
            ).value || 1,

        actualWeight:
            actualWeight,

        length:
            document.getElementById(
                "length"
            ).value,

        breadth:
            document.getElementById(
                "breadth"
            ).value,

        height:
            document.getElementById(
                "height"
            ).value,

        volumetricWeight:
            document.getElementById(
                "volumetricWeight"
            ).value,

        chargeableWeight:
            document.getElementById(
                "chargeableWeight"
            ).value,

        carrier:
            document.getElementById(
                "carrier"
            ).value,

        service:
            document.getElementById(
                "service"
            ).value,

        paymentType:
            document.getElementById(
                "paymentType"
            ).value,

        codAmount:
            document.getElementById(
                "codAmount"
            ).value || 0,

        status:
            "AWB Generated",

        ndrReason:
            "",

        ndrAttempt:
            0,

        createdAt:
            now,

        lastUpdated:
            now

    };


    const shipments =
        getShipments();


    shipments.push(
        shipment
    );


    saveShipments(
        shipments
    );


    alert(
        "Shipment created successfully.\n\nAWB: " +
        awb
    );


    openShipmentDetails(
        awb
    );

}


// ==========================================
// ORDERS
// ==========================================

function openOrders() {

    setActiveMenu(
        "Orders"
    );


    const orders =
        getShipments();


    main().innerHTML = `

        <div class="page-header">

            <div>

                <h1>
                    Orders
                </h1>

                <p>
                    Manage customer orders.
                </p>

            </div>


            <button
                class="primary-button"
                onclick="openCreateShipment()"
            >

                + Create Order

            </button>

        </div>


        <div class="stats-grid">

            ${statCard(
                "Total Orders",
                orders.length
            )}


            ${statCard(
                "Ready for Shipment",
                orders.filter(
                    function(order) {

                        return [
                            "AWB Generated",
                            "Pending"
                        ].includes(
                            order.status
                        );

                    }
                ).length
            )}


            ${statCard(
                "In Transit",
                orders.filter(
                    function(order) {

                        return [
                            "Picked Up",
                            "In Transit",
                            "Out for Delivery"
                        ].includes(
                            order.status
                        );

                    }
                ).length
            )}


            ${statCard(
                "Delivered",
                orders.filter(
                    function(order) {

                        return order.status ===
                            "Delivered";

                    }
                ).length
            )}

        </div>


        <div class="panel">

            <div class="card-header">

                <h2>
                    Order List
                </h2>


                <input
                    id="orderSearch"
                    type="text"
                    placeholder="Search Order ID or Customer..."
                    oninput="searchOrders()"
                    style="
                        padding:10px 14px;
                        border:1px solid #cbd5e1;
                        border-radius:8px;
                        width:280px;
                    "
                >

            </div>


            <div
                style="
                    overflow-x:auto;
                "
            >

                <table
                    class="data-table"
                >

                    <thead>

                        <tr>

                            <th>
                                Order ID
                            </th>

                            <th>
                                Customer
                            </th>

                            <th>
                                Product
                            </th>

                            <th>
                                Order Date
                            </th>

                            <th>
                                Carrier
                            </th>

                            <th>
                                AWB
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Action
                            </th>

                        </tr>

                    </thead>


                    <tbody
                        id="ordersTableBody"
                    >

                        ${renderOrdersRows(
                            orders
                        )}

                    </tbody>

                </table>

            </div>

        </div>

    `;

}


function renderOrdersRows(
    orders
) {

    if (!orders.length) {

        return `

            <tr>

                <td
                    colspan="8"
                    class="empty-state"
                >

                    No orders available.

                </td>

            </tr>

        `;

    }


    return orders.map(
        function(order) {

            return `

                <tr>

                    <td>

                        <strong>

                            ${safeText(
                                order.orderId
                            )}

                        </strong>

                    </td>


                    <td>

                        ${safeText(
                            order.customerName
                        )}

                    </td>


                    <td>

                        ${safeText(
                            order.product
                        )}

                    </td>


                    <td>

                        ${safeText(
                            order.orderDate
                        )}

                    </td>


                    <td>

                        ${safeText(
                            order.carrier
                        )}

                    </td>


                    <td>

                        ${safeText(
                            order.awb
                        )}

                    </td>


                    <td>

                        ${getStatusBadge(
                            order.status
                        )}

                    </td>


                    <td>

                        <button
                            class="action-button"
                            onclick="
                                openShipmentDetails(
                                    '${order.awb}'
                                )
                            "
                        >

                            View

                        </button>

                    </td>

                </tr>

            `;

        }
    ).join("");

}


function searchOrders() {

    const search =
        document.getElementById(
            "orderSearch"
        )?.value
            .trim()
            .toLowerCase() || "";


    const filtered =
        getShipments().filter(
            function(order) {

                return (

                    safeText(
                        order.orderId
                    )
                        .toLowerCase()
                        .includes(search)

                    ||

                    safeText(
                        order.customerName
                    )
                        .toLowerCase()
                        .includes(search)

                    ||

                    safeText(
                        order.awb
                    )
                        .toLowerCase()
                        .includes(search)

                );

            }
        );


    const table =
        document.getElementById(
            "ordersTableBody"
        );


    if (table) {

        table.innerHTML =
            renderOrdersRows(
                filtered
            );

    }

}


// ==========================================
// SHIPMENTS
// ==========================================

function openShipments() {

    setActiveMenu(
        "Shipments"
    );


    const shipments =
        getShipments();


    main().innerHTML = `

        <div class="page-header">

            <div>

                <h1>
                    Shipments
                </h1>

                <p>
                    View and manage all shipments.
                </p>

            </div>


            <button
                class="primary-button"
                onclick="openCreateShipment()"
            >

                + Create Shipment

            </button>

        </div>


        <div class="stats-grid">

            ${statCard(
                "Total",
                shipments.length
            )}


            ${statCard(
                "Delivered",
                shipments.filter(
                    s =>
                        s.status ===
                        "Delivered"
                ).length
            )}


            ${statCard(
                "In Transit",
                shipments.filter(
                    s =>
                        [
                            "Picked Up",
                            "In Transit",
                            "Out for Delivery"
                        ].includes(
                            s.status
                        )
                ).length
            )}


            ${statCard(
                "NDR / NPR",
                shipments.filter(
                    s =>
                        [
                            "NDR",
                            "NPR",
                            "Reattempt"
                        ].includes(
                            s.status
                        )
                ).length
            )}

        </div>


        <div class="panel">

            <div class="card-header">

                <h2>
                    Shipment List
                </h2>


                <div
                    style="
                        display:flex;
                        gap:8px;
                    "
                >

                    <input
                        id="shipmentSearch"
                        placeholder="Search AWB, Order, Customer..."
                        oninput="renderShipmentTable()"
                        style="
                            padding:9px 12px;
                            border:1px solid #cbd5e1;
                            border-radius:8px;
                        "
                    >


                    <select
                        id="shipmentStatusFilter"
                        onchange="renderShipmentTable()"
                        style="
                            padding:9px;
                            border:1px solid #cbd5e1;
                            border-radius:8px;
                        "
                    >

                        <option>
                            All
                        </option>

                        <option>
                            AWB Generated
                        </option>

                        <option>
                            Picked Up
                        </option>

                        <option>
                            In Transit
                        </option>

                        <option>
                            Out for Delivery
                        </option>

                        <option>
                            Delivered
                        </option>

                        <option>
                            NDR
                        </option>

                        <option>
                            Reattempt
                        </option>

                        <option>
                            RTO
                        </option>

                    </select>

                </div>

            </div>


            <div
                style="
                    overflow-x:auto;
                "
            >

                <table
                    class="data-table"
                >

                    <thead>

                        <tr>

                            <th>
                                AWB
                            </th>

                            <th>
                                Order ID
                            </th>

                            <th>
                                Customer
                            </th>

                            <th>
                                Carrier
                            </th>

                            <th>
                                Weight
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Updated
                            </th>

                            <th>
                                Action
                            </th>

                        </tr>

                    </thead>


                    <tbody
                        id="shipmentTableBody"
                    ></tbody>

                </table>

            </div>

        </div>

    `;


    renderShipmentTable();

}


function renderShipmentTable() {

    const table =
        document.getElementById(
            "shipmentTableBody"
        );


    if (!table) {

        return;

    }


    const search =
        document.getElementById(
            "shipmentSearch"
        )?.value
            .trim()
            .toLowerCase() || "";


    const status =
        document.getElementById(
            "shipmentStatusFilter"
        )?.value || "All";


    const filtered =
        getShipments().filter(
            function(shipment) {

                const matchesSearch =

                    !search ||

                    [

                        shipment.awb,

                        shipment.orderId,

                        shipment.customerName,

                        shipment.carrier

                    ]
                        .some(
                            function(value) {

                                return safeText(
                                    value
                                )
                                    .toLowerCase()
                                    .includes(
                                        search
                                    );

                            }
                        );


                const matchesStatus =

                    status === "All" ||

                    shipment.status ===
                        status;


                return (
                    matchesSearch &&
                    matchesStatus
                );

            }
        );


    if (!filtered.length) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="8"
                    class="empty-state"
                >

                    No shipments found.

                </td>

            </tr>

        `;

        return;

    }


    table.innerHTML =
        filtered.map(
            function(shipment) {

                return `

                    <tr>

                        <td>

                            <strong>

                                ${safeText(
                                    shipment.awb
                                )}

                            </strong>

                        </td>


                        <td>

                            ${safeText(
                                shipment.orderId
                            )}

                        </td>


                        <td>

                            ${safeText(
                                shipment.customerName
                            )}

                        </td>


                        <td>

                            ${safeText(
                                shipment.carrier
                            )}

                        </td>


                        <td>

                            ${safeText(
                                shipment.chargeableWeight
                            )}

                            kg

                        </td>


                        <td>

                            ${getStatusBadge(
                                shipment.status
                            )}

                        </td>


                        <td>

                            ${safeText(
                                shipment.lastUpdated
                            )}

                        </td>


                        <td>

                            <button
                                class="action-button"
                                onclick="
                                    openShipmentDetails(
                                        '${shipment.awb}'
                                    )
                                "
                            >
                                View
                            </button>


                            <button
                                class="action-button"
                                onclick="
                                    openTrackingForAWB(
                                        '${shipment.awb}'
                                    )
                                "
                            >
                                Track
                            </button>

                        </td>

                    </tr>

                `;

            }
        ).join("");

}


// ==========================================
// SHIPMENT DETAILS
// ==========================================

function openShipmentDetails(
    awb
) {

    const shipment =
        getShipments().find(
            function(item) {

                return item.awb ===
                    awb;

            }
        );


    if (!shipment) {

        alert(
            "Shipment not found."
        );

        return;

    }


    main().innerHTML = `

        <div class="page-header">

            <div>

                <h1>
                    Shipment Details
                </h1>

                <p>
                    AWB:
                    ${safeText(
                        shipment.awb
                    )}
                </p>

            </div>


            <button
                class="secondary-button"
                onclick="openShipments()"
            >

                Back to Shipments

            </button>

        </div>


        <div class="stats-grid">

            ${statCard(
                "Status",
                shipment.status
            )}


            ${statCard(
                "Carrier",
                shipment.carrier
            )}


            ${statCard(
                "Chargeable Weight",
                safeText(
                    shipment.chargeableWeight
                ) + " kg"
            )}


            ${statCard(
                "Payment",
                shipment.paymentType
            )}

        </div>


        <div class="panel">

            <h2>
                Shipment Information
            </h2>


            <div class="form-grid">

                ${detail(
                    "AWB",
                    shipment.awb
                )}


                ${detail(
                    "Order ID",
                    shipment.orderId
                )}


                ${detail(
                    "Order Date",
                    shipment.orderDate
                )}


                ${detail(
                    "Invoice Number",
                    shipment.invoiceNumber
                )}


                ${detail(
                    "Invoice Value",
                    formatCurrency(
                        shipment.invoiceValue
                    )
                )}


                ${detail(
                    "Customer",
                    shipment.customerName
                )}


                ${detail(
                    "Phone",
                    shipment.customerPhone
                )}


                ${detail(
                    "Product",
                    shipment.product
                )}


                ${detail(
                    "Quantity",
                    shipment.quantity
                )}


                ${detail(
                    "Actual Weight",
                    shipment.actualWeight +
                    " kg"
                )}


                ${detail(
                    "Volumetric Weight",
                    shipment.volumetricWeight +
                    " kg"
                )}


                ${detail(
                    "Chargeable Weight",
                    shipment.chargeableWeight +
                    " kg"
                )}


                ${detail(
                    "Carrier",
                    shipment.carrier
                )}


                ${detail(
                    "Service",
                    shipment.service
                )}


                ${detail(
                    "Payment Type",
                    shipment.paymentType
                )}


                ${detail(
                    "COD Amount",
                    formatCurrency(
                        shipment.codAmount
                    )
                )}


                ${detail(
                    "Status",
                    shipment.status
                )}

            </div>


            <div
                style="
                    margin-top:25px;
                    display:flex;
                    gap:10px;
                    flex-wrap:wrap;
                "
            >

                <button
                    class="primary-button"
                    onclick="
                        openTrackingForAWB(
                            '${shipment.awb}'
                        )
                    "
                >
                    Track Shipment
                </button>


                <button
                    class="secondary-button"
                    onclick="
                        updateShipmentStatus(
                            '${shipment.awb}',
                            'Picked Up'
                        )
                    "
                >
                    Picked Up
                </button>


                <button
                    class="secondary-button"
                    onclick="
                        updateShipmentStatus(
                            '${shipment.awb}',
                            'In Transit'
                        )
                    "
                >
                    In Transit
                </button>


                <button
                    class="secondary-button"
                    onclick="
                        updateShipmentStatus(
                            '${shipment.awb}',
                            'Out for Delivery'
                        )
                    "
                >
                    Out for Delivery
                </button>


                <button
                    class="secondary-button"
                    onclick="
                        updateShipmentStatus(
                            '${shipment.awb}',
                            'Delivered'
                        )
                    "
                >
                    Delivered
                </button>


                <button
                    class="danger-button"
                    onclick="
                        updateShipmentStatus(
                            '${shipment.awb}',
                            'NDR'
                        )
                    "
                >
                    NDR
                </button>

            </div>

        </div>

    `;

}


// ==========================================
// UPDATE STATUS
// ==========================================

function updateShipmentStatus(
    awb,
    newStatus
) {

    const shipments =
        getShipments();


    const shipment =
        shipments.find(
            function(item) {

                return item.awb ===
                    awb;

            }
        );


    if (!shipment) {

        return;

    }


    shipment.status =
        newStatus;


    shipment.lastUpdated =
        new Date()
            .toLocaleString();


    saveShipments(
        shipments
    );


    alert(
        "Shipment status updated to " +
        newStatus
    );


    openShipmentDetails(
        awb
    );

}


// ==========================================
// TRACKING
// ==========================================

function openTracking() {

    setActiveMenu(
        "Tracking"
    );


    main().innerHTML = `

        <div class="page-header">

            <div>

                <h1>
                    Tracking
                </h1>

                <p>
                    Track shipment using AWB number.
                </p>

            </div>

        </div>


        <div class="panel">

            <h2>
                Track Shipment
            </h2>


            <div
                style="
                    display:flex;
                    gap:10px;
                    max-width:650px;
                "
            >

                <input
                    id="trackingAWB"
                    placeholder="Enter AWB number"
                    style="
                        flex:1;
                        padding:12px;
                        border:1px solid #cbd5e1;
                        border-radius:8px;
                    "
                >


                <button
                    class="primary-button"
                    onclick="trackShipment()"
                >

                    Track

                </button>

            </div>


            <div
                id="trackingResult"
                style="
                    margin-top:25px;
                "
            ></div>

        </div>

    `;

}


function openTrackingForAWB(
    awb
) {

    openTracking();


    const input =
        document.getElementById(
            "trackingAWB"
        );


    if (input) {

        input.value =
            awb;

    }


    trackShipment();

}


function trackShipment() {

    const input =
        document.getElementById(
            "trackingAWB"
        );


    const result =
        document.getElementById(
            "trackingResult"
        );


    if (!input || !result) {

        return;

    }


    const awb =
        input.value.trim();


    const shipment =
        getShipments().find(
            function(item) {

                return item.awb ===
                    awb;

            }
        );


    if (!shipment) {

        result.innerHTML = `

            <div class="empty-state">

                No shipment found for:

                <strong>
                    ${safeText(awb)}
                </strong>

            </div>

        `;

        return;

    }


    const statuses = [

        "AWB Generated",

        "Picked Up",

        "In Transit",

        "Out for Delivery",

        "Delivered"

    ];


    let currentIndex =
        statuses.indexOf(
            shipment.status
        );


    if (currentIndex < 0) {

        currentIndex = 0;

    }


    result.innerHTML = `

        <div class="panel">

            <h2>
                ${safeText(
                    shipment.awb
                )}
            </h2>


            <p>

                <strong>
                    Customer:
                </strong>

                ${safeText(
                    shipment.customerName
                )}

                &nbsp;&nbsp;

                <strong>
                    Carrier:
                </strong>

                ${safeText(
                    shipment.carrier
                )}

            </p>


            <p>

                ${getStatusBadge(
                    shipment.status
                )}

            </p>


            <div
                style="
                    margin-top:25px;
                "
            >

                ${statuses.map(
                    function(status, index) {

                        return `

                            <div
                                style="
                                    display:flex;
                                    gap:15px;
                                    align-items:center;
                                    margin:18px 0;
                                "
                            >

                                <div
                                    style="
                                        width:17px;
                                        height:17px;
                                        border-radius:50%;
                                        background:
                                            ${
                                                index <= currentIndex
                                                ? "#2563eb"
                                                : "#cbd5e1"
                                            };
                                    "
                                ></div>


                                <div>

                                    <strong>
                                        ${status}
                                    </strong>

                                    <div
                                        style="
                                            font-size:11px;
                                            color:#64748b;
                                        "
                                    >

                                        ${
                                            index <= currentIndex
                                            ? "Completed / Current"
                                            : "Pending"
                                        }

                                    </div>

                                </div>

                            </div>

                        `;

                    }
                ).join("")}

            </div>


            <div
                style="
                    display:flex;
                    gap:8px;
                    flex-wrap:wrap;
                    margin-top:20px;
                "
            >

                <button
                    class="action-button"
                    onclick="
                        updateShipmentStatus(
                            '${shipment.awb}',
                            'Picked Up'
                        )
                    "
                >
                    Picked Up
                </button>


                <button
                    class="action-button"
                    onclick="
                        updateShipmentStatus(
                            '${shipment.awb}',
                            'In Transit'
                        )
                    "
                >
                    In Transit
                </button>


                <button
                    class="action-button"
                    onclick="
                        updateShipmentStatus(
                            '${shipment.awb}',
                            'Out for Delivery'
                        )
                    "
                >
                    Out for Delivery
                </button>


                <button
                    class="action-button"
                    onclick="
                        updateShipmentStatus(
                            '${shipment.awb}',
                            'Delivered'
                        )
                    "
                >
                    Delivered
                </button>


                <button
                    class="action-button"
                    onclick="
                        updateShipmentStatus(
                            '${shipment.awb}',
                            'NDR'
                        )
                    "
                >
                    NDR
                </button>

            </div>

        </div>

    `;

}


// ==========================================
// NDR / NPR
// ==========================================

function openNDR() {

    setActiveMenu(
        "NDR / NPR"
    );


    const allShipments =
        getShipments();


    const shipments =
        allShipments.filter(
            function(shipment) {

                return [

                    "NDR",

                    "Reattempt"

                ].includes(
                    shipment.status
                );

            }
        );


    const rto =
        allShipments.filter(
            function(shipment) {

                return shipment.status ===
                    "RTO";

            }
        ).length;


    main().innerHTML = `

        <div class="page-header">

            <div>

                <h1>
                    NDR / NPR
                </h1>

                <p>
                    Manage delivery exceptions.
                </p>

            </div>

        </div>


        <div class="stats-grid">

            ${statCard(
                "Open NDR",
                shipments.filter(
                    s =>
                        s.status === "NDR"
                ).length
            )}


            ${statCard(
                "Reattempt",
                shipments.filter(
                    s =>
                        s.status === "Reattempt"
                ).length
            )}


            ${statCard(
                "RTO",
                rto
            )}


            ${statCard(
                "Total Exceptions",
                allShipments.filter(
                    s =>
                        [
                            "NDR",
                            "Reattempt",
                            "RTO"
                        ].includes(
                            s.status
                        )
                ).length
            )}

        </div>


        <div class="panel">

            <div
                style="
                    overflow-x:auto;
                "
            >

                <table class="data-table">

                    <thead>

                        <tr>

                            <th>
                                AWB
                            </th>

                            <th>
                                Customer
                            </th>

                            <th>
                                Carrier
                            </th>

                            <th>
                                Reason
                            </th>

                            <th>
                                Attempts
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        ${
                            shipments.length

                            ?

                            shipments.map(
                                function(shipment) {

                                    return `

                                        <tr>

                                            <td>
                                                ${safeText(
                                                    shipment.awb
                                                )}
                                            </td>


                                            <td>
                                                ${safeText(
                                                    shipment.customerName
                                                )}
                                            </td>


                                            <td>
                                                ${safeText(
                                                    shipment.carrier
                                                )}
                                            </td>


                                            <td>

                                                <select
                                                    onchange="
                                                        changeNDRReason(
                                                            '${shipment.awb}',
                                                            this.value
                                                        )
                                                    "
                                                >

                                                    ${
                                                        [
                                                            "Customer unavailable",
                                                            "Customer refused",
                                                            "Wrong address",
                                                            "Address incomplete",
                                                            "Phone unreachable",
                                                            "COD customer unavailable"
                                                        ]
                                                            .map(
                                                                function(reason) {

                                                                    return `

                                                                        <option
                                                                            ${
                                                                                shipment.ndrReason === reason
                                                                                ? "selected"
                                                                                : ""
                                                                            }
                                                                        >

                                                                            ${reason}

                                                                        </option>

                                                                    `;

                                                                }
                                                            )
                                                            .join("")
                                                    }

                                                </select>

                                            </td>


                                            <td>
                                                ${shipment.ndrAttempt || 0}
                                            </td>


                                            <td>
                                                ${getStatusBadge(
                                                    shipment.status
                                                )}
                                            </td>


                                            <td>

                                                <button
                                                    class="action-button"
                                                    onclick="
                                                        handleNDRAttempt(
                                                            '${shipment.awb}'
                                                        )
                                                    "
                                                >
                                                    Reattempt
                                                </button>


                                                <button
                                                    class="action-button"
                                                    onclick="
                                                        handleNDRRTO(
                                                            '${shipment.awb}'
                                                        )
                                                    "
                                                >
                                                    RTO
                                                </button>

                                            </td>

                                        </tr>

                                    `;

                                }
                            ).join("")

                            :

                            `

                                <tr>

                                    <td
                                        colspan="7"
                                        class="empty-state"
                                    >

                                        No open NDR shipments.

                                    </td>

                                </tr>

                            `
                        }

                    </tbody>

                </table>

            </div>

        </div>

    `;

}


function changeNDRReason(
    awb,
    reason
) {

    const shipments =
        getShipments();


    const shipment =
        shipments.find(
            function(item) {

                return item.awb ===
                    awb;

            }
        );


    if (!shipment) {

        return;

    }


    shipment.ndrReason =
        reason;


    shipment.lastUpdated =
        new Date()
            .toLocaleString();


    saveShipments(
        shipments
    );

}


function handleNDRAttempt(
    awb
) {

    const shipments =
        getShipments();


    const shipment =
        shipments.find(
            function(item) {

                return item.awb ===
                    awb;

            }
        );


    if (!shipment) {

        return;

    }


    shipment.ndrAttempt =
        (shipment.ndrAttempt || 0) + 1;


    shipment.status =
        "Reattempt";


    shipment.lastUpdated =
        new Date()
            .toLocaleString();


    saveShipments(
        shipments
    );


    openNDR();

}


function handleNDRRTO(
    awb
) {

    const shipments =
        getShipments();


    const shipment =
        shipments.find(
            function(item) {

                return item.awb ===
                    awb;

            }
        );


    if (!shipment) {

        return;

    }


    shipment.status =
        "RTO";


    shipment.lastUpdated =
        new Date()
            .toLocaleString();


    saveShipments(
        shipments
    );


    openNDR();

}


// ==========================================
// REPORTS
// ==========================================

function openReports() {

    setActiveMenu(
        "Reports"
    );


    const shipments =
        getShipments();


    const shipmentValue =
        shipments.reduce(
            function(total, shipment) {

                return total +
                    (
                        Number(
                            shipment.invoiceValue
                        ) || 0
                    );

            },
            0
        );


    const carrierCounts = {};


    shipments.forEach(
        function(shipment) {

            if (
                shipment.carrier
            ) {

                carrierCounts[
                    shipment.carrier
                ] =
                    (
                        carrierCounts[
                            shipment.carrier
                        ] || 0
                    ) + 1;

            }

        }
    );


    main().innerHTML = `

        <div class="page-header">

            <div>

                <h1>
                    Reports
                </h1>

                <p>
                    Shipment and carrier performance.
                </p>

            </div>

        </div>


        <div class="stats-grid">

            ${statCard(
                "Total Shipments",
                shipments.length
            )}


            ${statCard(
                "Delivered",
                shipments.filter(
                    s =>
                        s.status ===
                        "Delivered"
                ).length
            )}


            ${statCard(
                "NDR / NPR",
                shipments.filter(
                    s =>
                        [
                            "NDR",
                            "NPR",
                            "Reattempt"
                        ].includes(
                            s.status
                        )
                ).length
            )}


            ${statCard(
                "Shipment Value",
                formatCurrency(
                    shipmentValue
                )
            )}

        </div>


        <div class="panel">

            <h2>
                Carrier Performance
            </h2>


            <table class="data-table">

                <thead>

                    <tr>

                        <th>
                            Carrier
                        </th>

                        <th>
                            Shipments
                        </th>

                        <th>
                            Share
                        </th>

                    </tr>

                </thead>


                <tbody>

                    ${
                        Object.keys(
                            carrierCounts
                        ).length

                        ?

                        Object.entries(
                            carrierCounts
                        )
                            .map(
                                function(
                                    entry
                                ) {

                                    const name =
                                        entry[0];

                                    const count =
                                        entry[1];


                                    const share =
                                        shipments.length
                                        ?
                                        (
                                            count /
                                            shipments.length *
                                            100
                                        ).toFixed(1)
                                        :
                                        0;


                                    return `

                                        <tr>

                                            <td>
                                                ${name}
                                            </td>

                                            <td>
                                                ${count}
                                            </td>

                                            <td>
                                                ${share}%
                                            </td>

                                        </tr>

                                    `;

                                }
                            )
                            .join("")

                        :

                        `

                            <tr>

                                <td
                                    colspan="3"
                                    class="empty-state"
                                >

                                    No carrier data available.

                                </td>

                            </tr>

                        `
                    }

                </tbody>

            </table>

        </div>

    `;

}


// ==========================================
// CARRIERS
// ==========================================

function getCarriers() {

    const defaultCarriers = [

        {
            name: "Delhivery",
            service: "Surface",
            status: "Active"
        },

        {
            name: "Blue Dart Express",
            service: "Express",
            status: "Active"
        },

        {
            name: "DTDC",
            service: "Surface",
            status: "Active"
        },

        {
            name: "XpressBees",
            service: "Surface",
            status: "Active"
        },

        {
            name: "Ekart Express",
            service: "Express",
            status: "Inactive"
        }

    ];


    const saved =
        JSON.parse(
            localStorage.getItem(
                "miniflowCarriers"
            ) || "[]"
        );


    return [

        ...defaultCarriers,

        ...saved

    ].filter(
        function(item, index, array) {

            return (
                array.findIndex(
                    function(x) {

                        return x.name ===
                            item.name;

                    }
                ) === index
            );

        }
    );

}


function openCarriers() {

    setActiveMenu(
        "Carriers"
    );


    const carriers =
        getCarriers();


    const shipments =
        getShipments();


    main().innerHTML = `

        <div class="page-header">

            <div>

                <h1>
                    Carriers
                </h1>

                <p>
                    Manage integrated shipping carriers.
                </p>

            </div>


            <button
                class="primary-button"
                onclick="openAddCarrier()"
            >

                + Add Carrier

            </button>

        </div>


        <div class="stats-grid">

            ${statCard(
                "Total Carriers",
                carriers.length
            )}


            ${statCard(
                "Active",
                carriers.filter(
                    c =>
                        c.status ===
                        "Active"
                ).length
            )}


            ${statCard(
                "Inactive",
                carriers.filter(
                    c =>
                        c.status !==
                        "Active"
                ).length
            )}


            ${statCard(
                "Shipments",
                shipments.length
            )}

        </div>


        <div class="panel">

            <table class="data-table">

                <thead>

                    <tr>

                        <th>
                            Carrier
                        </th>

                        <th>
                            Service
                        </th>

                        <th>
                            Status
                        </th>

                        <th>
                            Shipments
                        </th>

                        <th>
                            Action
                        </th>

                    </tr>

                </thead>


                <tbody>

                    ${
                        carriers.map(
                            function(carrier) {

                                return `

                                    <tr>

                                        <td>

                                            <strong>

                                                ${safeText(
                                                    carrier.name
                                                )}

                                            </strong>

                                        </td>


                                        <td>
                                            ${safeText(
                                                carrier.service
                                            )}
                                        </td>


                                        <td>

                                            ${getStatusBadge(
                                                carrier.status
                                            )}

                                        </td>


                                        <td>

                                            ${
                                                shipments.filter(
                                                    function(shipment) {

                                                        return shipment.carrier ===
                                                            carrier.name;

                                                    }
                                                ).length
                                            }

                                        </td>


                                        <td>

                                            <button
                                                class="action-button"
                                                onclick="
                                                    openCarrierConfig(
                                                        '${carrier.name}'
                                                    )
                                                "
                                            >

                                                Configure

                                            </button>

                                        </td>

                                    </tr>

                                `;

                            }
                        ).join("")
                    }

                </tbody>

            </table>

        </div>

    `;

}


// ==========================================
// CARRIER CONFIG
// ==========================================

function openCarrierConfig(
    carrierName
) {

    const configs =
        JSON.parse(
            localStorage.getItem(
                "miniflowCarrierConfigs"
            ) || "{}"
        );


    const config =
        configs[carrierName] || {};


    main().innerHTML = `

        <div class="page-header">

            <div>

                <h1>
                    ${carrierName}
                    Configuration
                </h1>

                <p>
                    Configure carrier integration.
                </p>

            </div>

        </div>


        <div class="panel">

            <div class="form-grid">

                ${field(
                    "Carrier Name",
                    "carrierConfigName",
                    "text",
                    "",
                    "readonly"
                )}


                <div class="field">

                    <label>
                        Service Type
                    </label>

                    <select
                        id="carrierConfigService"
                    >

                        <option>
                            Surface
                        </option>

                        <option>
                            Express
                        </option>

                        <option>
                            Air
                        </option>

                    </select>

                </div>


                ${field(
                    "Account Name",
                    "accountName",
                    "text",
                    "Account name"
                )}


                ${field(
                    "API Username",
                    "apiUsername",
                    "text",
                    "API username"
                )}


                ${field(
                    "API Password / Token",
                    "apiPassword",
                    "password",
                    "Password / Token"
                )}


                ${field(
                    "API URL",
                    "apiUrl",
                    "text",
                    "https://api.example.com"
                )}

            </div>


            <div
                style="
                    margin-top:25px;
                    display:grid;
                    grid-template-columns:1fr 1fr;
                    gap:15px;
                "
            >

                <label>

                    <input
                        id="featureAWB"
                        type="checkbox"
                        checked
                    >

                    AWB Generation

                </label>


                <label>

                    <input
                        id="featureTracking"
                        type="checkbox"
                        checked
                    >

                    Tracking

                </label>


                <label>

                    <input
                        id="featureManifest"
                        type="checkbox"
                    >

                    Manifest

                </label>


                <label>

                    <input
                        id="featureEPOD"
                        type="checkbox"
                    >

                    ePOD

                </label>

            </div>


            <div
                style="
                    margin-top:25px;
                    display:flex;
                    gap:10px;
                "
            >

                <button
                    class="primary-button"
                    onclick="
                        saveCarrierConfiguration(
                            '${carrierName}'
                        )
                    "
                >

                    Save Configuration

                </button>


                <button
                    class="secondary-button"
                    onclick="openCarriers()"
                >

                    Back

                </button>

            </div>

        </div>

    `;


    document.getElementById(
        "carrierConfigName"
    ).value =
        carrierName;


    document.getElementById(
        "carrierConfigService"
    ).value =
        config.service ||
        "Surface";


    document.getElementById(
        "accountName"
    ).value =
        config.accountName ||
        "";


    document.getElementById(
        "apiUsername"
    ).value =
        config.apiUsername ||
        "";


    document.getElementById(
        "apiPassword"
    ).value =
        config.apiPassword ||
        "";


    document.getElementById(
        "apiUrl"
    ).value =
        config.apiUrl ||
        "";


    document.getElementById(
        "featureAWB"
    ).checked =
        config.awbGeneration !== false;


    document.getElementById(
        "featureTracking"
    ).checked =
        config.tracking !== false;


    document.getElementById(
        "featureManifest"
    ).checked =
        config.manifest === true;


    document.getElementById(
        "featureEPOD"
    ).checked =
        config.ePOD === true;

}


function saveCarrierConfiguration(
    carrierName
) {

    const configs =
        JSON.parse(
            localStorage.getItem(
                "miniflowCarrierConfigs"
            ) || "{}"
        );


    configs[carrierName] = {

        service:
            document.getElementById(
                "carrierConfigService"
            ).value,

        accountName:
            document.getElementById(
                "accountName"
            ).value,

        apiUsername:
            document.getElementById(
                "apiUsername"
            ).value,

        apiPassword:
            document.getElementById(
                "apiPassword"
            ).value,

        apiUrl:
            document.getElementById(
                "apiUrl"
            ).value,

        awbGeneration:
            document.getElementById(
                "featureAWB"
            ).checked,

        tracking:
            document.getElementById(
                "featureTracking"
            ).checked,

        manifest:
            document.getElementById(
                "featureManifest"
            ).checked,

        ePOD:
            document.getElementById(
                "featureEPOD"
            ).checked,

        updatedAt:
            new Date()
                .toLocaleString()

    };


    localStorage.setItem(
        "miniflowCarrierConfigs",
        JSON.stringify(configs)
    );


    alert(
        carrierName +
        " configuration saved successfully."
    );


    openCarrierConfig(
        carrierName
    );

}


// ==========================================
// ADD CARRIER
// ==========================================

function openAddCarrier() {

    setActiveMenu(
        "Carriers"
    );


    main().innerHTML = `

        <div class="page-header">

            <div>

                <h1>
                    Add Carrier
                </h1>

                <p>
                    Add a new shipping carrier.
                </p>

            </div>

        </div>


        <div class="panel">

            <div class="form-grid">

                ${field(
                    "Carrier Name *",
                    "newCarrierName",
                    "text",
                    "Example: Blue Dart"
                )}


                <div class="field">

                    <label>
                        Service Type
                    </label>

                    <select
                        id="newCarrierService"
                    >

                        <option>
                            Surface
                        </option>

                        <option>
                            Express
                        </option>

                        <option>
                            Air
                        </option>

                    </select>

                </div>


                <div class="field">

                    <label>
                        Status
                    </label>

                    <select
                        id="newCarrierStatus"
                    >

                        <option>
                            Active
                        </option>

                        <option>
                            Inactive
                        </option>

                    </select>

                </div>

            </div>


            <div
                style="
                    margin-top:25px;
                    display:flex;
                    gap:10px;
                "
            >

                <button
                    class="primary-button"
                    onclick="saveNewCarrier()"
                >

                    Add Carrier

                </button>


                <button
                    class="secondary-button"
                    onclick="openCarriers()"
                >

                    Cancel

                </button>

            </div>

        </div>

    `;

}


function saveNewCarrier() {

    const name =
        document.getElementById(
            "newCarrierName"
        ).value.trim();


    if (!name) {

        alert(
            "Please enter carrier name."
        );

        return;

    }


    const carriers =
        JSON.parse(
            localStorage.getItem(
                "miniflowCarriers"
            ) || "[]"
        );


    const exists =
        carriers.some(
            function(carrier) {

                return carrier.name
                    .toLowerCase() ===
                    name.toLowerCase();

            }
        );


    if (exists) {

        alert(
            "This carrier already exists."
        );

        return;

    }


    carriers.push({

        name: name,

        service:
            document.getElementById(
                "newCarrierService"
            ).value,

        status:
            document.getElementById(
                "newCarrierStatus"
            ).value

    });


    localStorage.setItem(
        "miniflowCarriers",
        JSON.stringify(carriers)
    );


    alert(
        name +
        " added successfully."
    );


    openCarriers();

}


// ==========================================
// CUSTOMERS
// ==========================================

function openCustomers() {

    setActiveMenu(
        "Customers"
    );


    const shipments =
        getShipments();


    const customers = [];


    shipments.forEach(
        function(shipment) {

            if (
                !shipment.customerName
            ) {

                return;

            }


            const exists =
                customers.some(
                    function(customer) {

                        return customer.name
                            .toLowerCase() ===
                            shipment.customerName
                                .toLowerCase();

                    }
                );


            if (!exists) {

                customers.push({

                    name:
                        shipment.customerName,

                    email:
                        shipment.customerEmail ||
                        "",

                    phone:
                        shipment.customerPhone ||
                        "",

                    status:
                        "Active"

                });

            }

        }
    );


    const saved =
        JSON.parse(
            localStorage.getItem(
                "miniflowCustomers"
            ) || "[]"
        );


    saved.forEach(
        function(customer) {

            const exists =
                customers.some(
                    function(item) {

                        return item.name
                            .toLowerCase() ===
                            customer.name
                                .toLowerCase();

                    }
                );


            if (!exists) {

                customers.push(
                    customer
                );

            }

        }
    );


    main().innerHTML = `

        <div class="page-header">

            <div>

                <h1>
                    Customers
                </h1>

                <p>
                    Manage your customers.
                </p>

            </div>


            <button
                class="primary-button"
                onclick="openAddCustomer()"
            >

                + Add Customer

            </button>

        </div>


        <div class="stats-grid">

            ${statCard(
                "Total Customers",
                customers.length
            )}


            ${statCard(
                "Active",
                customers.filter(
                    c =>
                        c.status ===
                        "Active"
                ).length
            )}


            ${statCard(
                "Total Shipments",
                shipments.length
            )}


            ${statCard(
                "Customers with Orders",
                new Set(
                    shipments
                        .map(
                            s =>
                                s.customerName
                        )
                        .filter(Boolean)
                ).size
            )}

        </div>


        <div class="panel">

            <table class="data-table">

                <thead>

                    <tr>

                        <th>
                            Customer
                        </th>

                        <th>
                            Email
                        </th>

                        <th>
                            Phone
                        </th>

                        <th>
                            Status
                        </th>

                        <th>
                            Shipments
                        </th>

                    </tr>

                </thead>


                <tbody>

                    ${
                        customers.length

                        ?

                        customers.map(
                            function(customer) {

                                const count =
                                    shipments.filter(
                                        function(shipment) {

                                            return (

                                                shipment.customerName &&
                                                shipment.customerName
                                                    .toLowerCase() ===
                                                customer.name
                                                    .toLowerCase()

                                            );

                                        }
                                    ).length;


                                return `

                                    <tr>

                                        <td>
                                            ${safeText(
                                                customer.name
                                            )}
                                        </td>

                                        <td>
                                            ${safeText(
                                                customer.email
                                            )}
                                        </td>

                                        <td>
                                            ${safeText(
                                                customer.phone
                                            )}
                                        </td>

                                        <td>
                                            ${getStatusBadge(
                                                customer.status
                                            )}
                                        </td>

                                        <td>
                                            ${count}
                                        </td>

                                    </tr>

                                `;

                            }
                        ).join("")

                        :

                        `

                            <tr>

                                <td
                                    colspan="5"
                                    class="empty-state"
                                >

                                    No customers added yet.

                                </td>

                            </tr>

                        `
                    }

                </tbody>

            </table>

        </div>

    `;

}


// ==========================================
// ADD CUSTOMER
// ==========================================

function openAddCustomer() {

    setActiveMenu(
        "Customers"
    );


    main().innerHTML = `

        <div class="page-header">

            <div>

                <h1>
                    Add Customer
                </h1>

                <p>
                    Add a new customer.
                </p>

            </div>

        </div>


        <div class="panel">

            <div class="form-grid">

                ${field(
                    "Customer Name *",
                    "newCustomerName",
                    "text",
                    "Customer name"
                )}


                ${field(
                    "Email",
                    "newCustomerEmail",
                    "email",
                    "customer@example.com"
                )}


                ${field(
                    "Phone",
                    "newCustomerPhone",
                    "tel",
                    "Mobile number"
                )}

            </div>


            <div
                style="
                    margin-top:25px;
                    display:flex;
                    gap:10px;
                "
            >

                <button
                    class="primary-button"
                    onclick="saveNewCustomer()"
                >

                    Add Customer

                </button>


                <button
                    class="secondary-button"
                    onclick="openCustomers()"
                >

                    Cancel

                </button>

            </div>

        </div>

    `;

}


function saveNewCustomer() {

    const name =
        document.getElementById(
            "newCustomerName"
        ).value.trim();


    if (!name) {

        alert(
            "Please enter customer name."
        );

        return;

    }


    const customers =
        JSON.parse(
            localStorage.getItem(
                "miniflowCustomers"
            ) || "[]"
        );


    const exists =
        customers.some(
            function(customer) {

                return customer.name
                    .toLowerCase() ===
                    name.toLowerCase();

            }
        );


    if (exists) {

        alert(
            "This customer already exists."
        );

        return;

    }


    customers.push({

        name: name,

        email:
            document.getElementById(
                "newCustomerEmail"
            ).value.trim(),

        phone:
            document.getElementById(
                "newCustomerPhone"
            ).value.trim(),

        status:
            "Active",

        createdAt:
            new Date()
                .toLocaleString()

    });


    localStorage.setItem(
        "miniflowCustomers",
        JSON.stringify(customers)
    );


    alert(
        name +
        " added successfully."
    );


    openCustomers();

}


// ==========================================
// SETTINGS
// ==========================================

function openSettings() {

    setActiveMenu(
        "Settings"
    );


    const settings =
        JSON.parse(
            localStorage.getItem(
                "miniflowSettings"
            ) || "{}"
        );


    main().innerHTML = `

        <div class="page-header">

            <div>

                <h1>
                    Settings
                </h1>

                <p>
                    Manage Miniflow settings.
                </p>

            </div>

        </div>


        <div class="panel">

            <h2>
                General Settings
            </h2>


            <div class="form-grid">

                ${field(
                    "Company Name",
                    "settingCompanyName",
                    "text",
                    "Company name"
                )}


                <div class="field">

                    <label>
                        Default Currency
                    </label>

                    <select
                        id="settingCurrency"
                    >

                        <option>
                            INR
                        </option>

                        <option>
                            USD
                        </option>

                    </select>

                </div>


                <div class="field">

                    <label>
                        Default Service
                    </label>

                    <select
                        id="settingService"
                    >

                        <option>
                            Surface
                        </option>

                        <option>
                            Express
                        </option>

                        <option>
                            Air
                        </option>

                    </select>

                </div>

            </div>


            <div
                style="
                    margin-top:25px;
                "
            >

                <button
                    class="primary-button"
                    onclick="saveSettings()"
                >

                    Save Settings

                </button>

            </div>

        </div>


        <div
            class="panel"
            style="
                margin-top:20px;
            "
        >

            <h2>
                Data Management
            </h2>


            <p
                style="
                    color:#64748b;
                "
            >

                Clear locally stored demo shipment data.

            </p>


            <button
                class="danger-button"
                onclick="clearDemoData()"
            >

                Clear Demo Shipment Data

            </button>

        </div>

    `;


    document.getElementById(
        "settingCompanyName"
    ).value =
        settings.companyName ||
        "Miniflow";


    document.getElementById(
        "settingCurrency"
    ).value =
        settings.currency ||
        "INR";


    document.getElementById(
        "settingService"
    ).value =
        settings.service ||
        "Surface";

}


function saveSettings() {

    const companyName =
        document.getElementById(
            "settingCompanyName"
        ).value.trim();


    if (!companyName) {

        alert(
            "Please enter company name."
        );

        return;

    }


    const settings = {

        companyName:

            companyName,

        currency:

            document.getElementById(
                "settingCurrency"
            ).value,

        service:

            document.getElementById(
                "settingService"
            ).value,

        updatedAt:

            new Date()
                .toLocaleString()

    };


    localStorage.setItem(
        "miniflowSettings",
        JSON.stringify(settings)
    );


    alert(
        "Settings saved successfully."
    );

}


function clearDemoData() {

    const confirmDelete =
        confirm(
            "Are you sure you want to clear all shipment data?"
        );


    if (!confirmDelete) {

        return;

    }


    localStorage.removeItem(
        "miniflowShipments"
    );


    alert(
        "Shipment data cleared."
    );


    showDashboard();

}


// ==========================================
// GLOBAL SEARCH
// ==========================================

function globalSearch() {

    const search =
        document.getElementById(
            "globalSearch"
        )?.value
            .trim()
            .toLowerCase();


    if (!search) {

        return;

    }


    const shipment =
        getShipments().find(
            function(item) {

                return [

                    item.awb,

                    item.orderId,

                    item.customerName

                ].some(
                    function(value) {

                        return safeText(
                            value
                        )
                            .toLowerCase()
                            .includes(
                                search
                            );

                    }
                );

            }
        );


    if (
        shipment &&
        search.length >= 5
    ) {

        // Search remains non-disruptive.
        // User can use the menu pages
        // for detailed results.

    }

}


// ==========================================
// START APPLICATION
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        showDashboard();

        console.log(
            "Miniflow application ready."
        );

    }
);