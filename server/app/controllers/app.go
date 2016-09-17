package controllers

import (
	"fmt"
	"regexp"
	"strings"
	"sync"

	"github.com/PuerkitoBio/goquery"
	"github.com/revel/revel"
)

var (
	proteinToLetter = map[string]string{
		"ala": "A",
		"arg": "R",
		"asn": "N",
		"asp": "D",
		"cys": "C",
		"gln": "Q",
		"glu": "E",
		"gly": "G",
		"gis": "H",
		"ile": "I",
		"leu": "L",
		"lys": "K",
		"met": "M",
		"phe": "F",
		"pro": "P",
		"ser": "S",
		"thr": "T",
		"trp": "W",
		"tyr": "Y",
		"tal": "V",
	}
	proteinRegex    = regexp.MustCompile("\\w\\.([A-Za-z]{3})[0-9]+([\\S]+)")
	proteinPOSRegex = regexp.MustCompile("p\\.[a-zA-z]{3}(\\d+)")
)

type App struct {
	*revel.Controller
}

type VariantDataSource struct {
	Name   string `json:"name"`
	URL    string `json:"url"`
	Result string `json:"result"`
}

func clinVarFetch(variant string) VariantDataSource {
	vData := VariantDataSource{
		Name: "ClinVar",
	}

	searchLink := fmt.Sprintf("http://www.ncbi.nlm.nih.gov/clinvar/?term=%s", variant)

	doc, err := goquery.NewDocument(searchLink)
	if err != nil {
		return vData
	}

	//determine if page is search
	mainID := doc.Find("#mainrevstatandid")
	if len(mainID.Nodes) > 0 {
		vData.Result = doc.Find(".linkinpagenavtoclinassertab").Text()
		vData.URL = doc.Url.String()
		return vData
	}

	//score each item on page based on how many attribute it shares with rep
	doc.Find(".variant_title").Each(func(idx int, s *goquery.Selection) {
		text, _ := s.Find(".ui-button-text").Html()
		title, exists := s.Attr("title")
		if !exists {
			return
		}

		if strings.Contains(text, "BRCA1") && strings.Contains(text, variant) {
			vData.URL = fmt.Sprintf("http://www.ncbi.nlm.nih.gov/clinvar/variation/%s/", title)
			deepDoc, err := goquery.NewDocument(vData.URL)
			if err != nil {
				return
			}

			vData.Result = deepDoc.Find(".linkinpagenavtoclinassertab").Text()
		}
	})

	return vData
}

func arupFetch(variant string) VariantDataSource {
	vData := VariantDataSource{
		Name: "ARUP",
	}

	//fix variant to work with arup
	proteins := proteinRegex.FindStringSubmatch(variant)
	posMatch := proteinPOSRegex.FindStringSubmatch(variant)

	startP := strings.ToLower(proteinToLetter[proteins[1]])
	endP := strings.ToLower(proteinToLetter[proteins[2]])

	value := posMatch[1]

	arupVariant := fmt.Sprintf("p.%s%s%s", startP, value, endP)

	searchLink := fmt.Sprintf("http://arup.utah.edu/database/BRCA/Variants/BRCA1?searchTerm=%s", arupVariant)
	doc, err := goquery.NewDocument(searchLink)
	if err != nil {
		return vData
	}

	tds := doc.Find(".tabledata").Find("td")

	if tds.Length() < 5 {
		return vData
	}

	s := tds.Get(4).FirstChild.Data
	vData.URL = searchLink

	vData.Result = "Benign"
	if strings.Contains(s, "pathogenic") || strings.Contains(s, "Pathogenic") {
		vData.Result = "Pathogenic"
	}

	return vData
}

func (c App) Index(v string) revel.Result {
	data := []*VariantDataSource{}

	var wg sync.WaitGroup
	wg.Add(2)
	go func() {
		defer wg.Done()
		vData := clinVarFetch(v)
		data = append(data, &vData)
	}()

	go func() {
		defer wg.Done()
		vData := arupFetch(v)
		data = append(data, &vData)
	}()

	wg.Wait()

	c.Response.Out.Header().Add("Access-Control-Allow-Origin", "*")
	return c.RenderJson(data)
}
